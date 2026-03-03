import assert from "node:assert/strict";
import { joinSession, publishOperation, resetSessions } from "../src/realtime/sessionServer.js";

export function runRealtimeSyncE2ETests() {
  resetSessions();
  const clientAInbox = [];
  const clientBInbox = [];

  joinSession({
    documentId: "doc-e2e",
    clientId: "A",
    permission: "edit",
    onEvent: (event) => clientAInbox.push(event)
  });

  joinSession({
    documentId: "doc-e2e",
    clientId: "B",
    permission: "edit",
    onEvent: (event) => clientBInbox.push(event)
  });

  const ack1 = publishOperation({
    documentId: "doc-e2e",
    opId: "op-1",
    authorId: "A",
    baseRevisionId: "r0",
    revisionId: "r1"
  });

  const duplicate = publishOperation({
    documentId: "doc-e2e",
    opId: "op-1",
    authorId: "A",
    baseRevisionId: "r1",
    revisionId: "r2"
  });

  const ack2 = publishOperation({
    documentId: "doc-e2e",
    opId: "op-2",
    authorId: "B",
    baseRevisionId: "r1",
    revisionId: "r2"
  });

  assert.equal(ack1.ack, "accepted");
  assert.equal(duplicate.ack, "duplicate");
  assert.equal(ack2.ack, "accepted");
  assert.equal(clientBInbox.length, 1);
  assert.equal(clientAInbox.length, 1);
}
