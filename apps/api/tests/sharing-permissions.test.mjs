import assert from "node:assert/strict";
import { joinSession, publishOperation, resetSessions } from "../src/realtime/sessionServer.js";
import { canMutate } from "../src/auth/shareAccess.js";

export function runSharingPermissionsTests() {
  resetSessions();
  joinSession({ documentId: "doc-p", clientId: "owner", permission: "edit", onEvent: () => {} });
  joinSession({ documentId: "doc-p", clientId: "viewer", permission: "view", onEvent: () => {} });

  assert.equal(canMutate("view"), false);
  assert.equal(canMutate("edit"), true);

  const forbidden = publishOperation({
    documentId: "doc-p",
    opId: "op-v",
    authorId: "viewer",
    baseRevisionId: "r0",
    revisionId: "r1"
  });

  assert.equal(forbidden.ack, "forbidden");

  const accepted = publishOperation({
    documentId: "doc-p",
    opId: "op-e",
    authorId: "owner",
    baseRevisionId: "r0",
    revisionId: "r1"
  });

  assert.equal(accepted.ack, "accepted");
}
