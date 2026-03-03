import assert from "node:assert/strict";
import { applyServerAck, createSyncState, recoverFromSnapshot } from "../src/collab/syncState.js";

export function runSyncRecoveryTests() {
  const state = createSyncState();

  const conflicted = applyServerAck(state, {
    ack: "conflict",
    revisionId: "r4"
  });
  assert.equal(conflicted.needsResync, true);

  const recovered = recoverFromSnapshot(conflicted, {
    revisionId: "r4"
  });
  assert.equal(recovered.needsResync, false);
  assert.equal(recovered.revisionId, "r4");
}
