import assert from "node:assert/strict";
import { joinSession, publishOperation, resetSessions } from "../src/realtime/sessionServer.js";

export function runRealtimeTests() {
  resetSessions();
  const receivedByB = [];

  const joinA = joinSession({ documentId: "doc-r", clientId: "A", onEvent: () => {} });
  const joinB = joinSession({
    documentId: "doc-r",
    clientId: "B",
    onEvent: (event) => receivedByB.push(event)
  });

  assert.equal(joinA.type, "joined");
  assert.ok(joinB.peers.includes("A"));

  const ack = publishOperation({
    documentId: "doc-r",
    revisionId: "r1",
    opId: "op-1",
    authorId: "A",
    delta: "insert text"
  });

  assert.equal(ack.ack, "accepted");
  assert.equal(receivedByB.length, 1);
  assert.equal(receivedByB[0].payload.opId, "op-1");
}
