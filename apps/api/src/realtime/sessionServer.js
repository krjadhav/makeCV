import { createOperationStore } from "./operationStore.js";

const sessions = new Map();

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
    peers: Array.from(session.clients.keys())
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

  if (session.store.has(opId)) {
    return { ack: "duplicate", opId, revisionId: session.revisionId };
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

export function resetSessions() {
  sessions.clear();
}
