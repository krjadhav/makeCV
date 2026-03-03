import assert from "node:assert/strict";
import { joinSession, publishOperation, resetSessions, snapshotSession } from "../src/realtime/sessionServer.js";

export function runSyncConflictTests() {
  resetSessions();
  joinSession({ documentId: "doc-c", clientId: "A", onEvent: () => {} });
  joinSession({ documentId: "doc-c", clientId: "B", onEvent: () => {} });

  const first = publishOperation({
    documentId: "doc-c",
    opId: "op-1",
    authorId: "A",
    baseRevisionId: "r0",
    revisionId: "r1"
  });
  assert.equal(first.ack, "accepted");

  const duplicate = publishOperation({
    documentId: "doc-c",
    opId: "op-1",
    authorId: "A",
    baseRevisionId: "r1",
    revisionId: "r2"
  });
  assert.equal(duplicate.ack, "duplicate");

  const conflict = publishOperation({
    documentId: "doc-c",
    opId: "op-2",
    authorId: "B",
    baseRevisionId: "r0",
    revisionId: "r2"
  });
  assert.equal(conflict.ack, "conflict");

  const snapshot = snapshotSession("doc-c");
  assert.equal(snapshot.revisionId, "r1");
}
