import { resolveOperation } from "./conflictResolver.js";

const sessions = new Map();

function createOperationStore() {
  const seen = new Set();
  return {
    has(opId) {
      return seen.has(opId);
    },
    add(opId) {
      seen.add(opId);
    },
    getSet() {
      return seen;
    }
  };
}

function getSession(documentId) {
  if (!sessions.has(documentId)) {
    sessions.set(documentId, {
      clients: new Map(),
      store: createOperationStore(),
      revisionId: "r0"
    });
  }

  return sessions.get(documentId);
}

export function joinSession({ documentId, clientId, onEvent }) {
  const session = getSession(documentId);
  session.clients.set(clientId, onEvent);

  return {
    type: "joined",
    documentId,
    clientId,
    peers: Array.from(session.clients.keys()),
    revisionId: session.revisionId
  };
}

export function leaveSession({ documentId, clientId }) {
  const session = getSession(documentId);
  session.clients.delete(clientId);
  return { type: "left", documentId, clientId };
}

export function publishOperation(operation) {
  const { documentId, opId, revisionId, authorId } = operation;
  const session = getSession(documentId);

  const resolution = resolveOperation({
    sessionRevisionId: session.revisionId,
    operation,
    seenOpIds: session.store.getSet()
  });

  if (resolution.type === "duplicate") {
    return { ack: "duplicate", opId, revisionId: session.revisionId };
  }

  if (resolution.type === "conflict") {
    return { ack: "conflict", opId, revisionId: session.revisionId };
  }

  session.store.add(opId);
  session.revisionId = revisionId;

  for (const [clientId, listener] of session.clients.entries()) {
    if (clientId !== authorId) {
      listener({ type: "operation", payload: operation });
    }
  }

  return { ack: "accepted", opId, revisionId };
}

export function snapshotSession(documentId) {
  const session = getSession(documentId);
  return {
    revisionId: session.revisionId,
    peers: Array.from(session.clients.keys())
  };
}

export function resetSessions() {
  sessions.clear();
}
