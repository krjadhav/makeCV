import assert from "node:assert/strict";
import { createSessionClient } from "../src/collab/sessionClient.js";
import { applyServerAck, createSyncState, recoverFromSnapshot } from "../src/collab/syncState.js";

export function runRealtimeCollabTests() {
  const events = [];
  let failedOnce = false;
  const adapter = {
    subscribe(params) {
      events.push(["subscribe", params]);
      if (!failedOnce) {
        failedOnce = true;
        throw new Error("temporary disconnect");
      }
      return {
        joined: { type: "joined", params },
        unsubscribe() {
          events.push(["unsubscribe"]);
        }
      };
    },
    publish(operation) {
      events.push(["publish", operation]);
      if (operation.opId === "conflict") {
        return { ack: "conflict", revisionId: "r4" };
      }
      return { ack: "accepted", revisionId: operation.revisionId };
    }
  };

  const client = createSessionClient(adapter);
  const reconnectOutcome = client.reconnectWithRetry({ documentId: "doc-e2e", clientId: "A" }, { maxRetries: 2 });
  assert.equal(reconnectOutcome.reconnected, true);

  const accepted = client.publish({ opId: "ok", revisionId: "r1" });
  assert.equal(accepted.ack, "accepted");

  let state = createSyncState();
  state = applyServerAck(state, client.publish({ opId: "conflict", revisionId: "r2" }));
  assert.equal(state.needsResync, true);

  state = recoverFromSnapshot(state, { revisionId: "r4" });
  assert.equal(state.needsResync, false);

  client.disconnect();
  assert.ok(events.some((item) => item[0] === "unsubscribe"));
}
