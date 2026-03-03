import assert from "node:assert/strict";
import { applyReconnectOutcome, applyServerAck, createSyncState, recoverFromSnapshot } from "../src/collab/syncState.js";

export function runSyncRecoveryTests() {
  let state = createSyncState();

  state = applyServerAck(state, {
    ack: "conflict",
    revisionId: "r4"
  });
  assert.equal(state.needsResync, true);

  state = applyReconnectOutcome(state, { reconnected: false });
  assert.equal(state.reconnecting, true);

  state = applyReconnectOutcome(state, { reconnected: true });
  assert.equal(state.reconnecting, false);

  const recovered = recoverFromSnapshot(state, {
    revisionId: "r4"
  });
  assert.equal(recovered.needsResync, false);
  assert.equal(recovered.revisionId, "r4");
}
