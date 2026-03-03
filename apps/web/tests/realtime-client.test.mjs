import assert from "node:assert/strict";
import { createSessionClient } from "../src/collab/sessionClient.js";

export function runRealtimeClientTests() {
  const calls = [];
  let failures = 1;
  const adapter = {
    subscribe(params) {
      calls.push(["subscribe", params]);
      if (failures > 0) {
        failures -= 1;
        throw new Error("network timeout");
      }
      return {
        joined: { type: "joined", params },
        unsubscribe() {
          calls.push(["unsubscribe"]);
        }
      };
    },
    publish(op) {
      calls.push(["publish", op]);
      return { ack: "accepted", opId: op.opId };
    }
  };

  const client = createSessionClient(adapter);
  const first = client.reconnectWithRetry({ documentId: "doc-r", clientId: "A" }, { maxRetries: 2 });
  assert.equal(first.reconnected, true);
  assert.equal(first.attempts, 2);

  const ack = client.publish({ opId: "op-1" });
  assert.equal(ack.ack, "accepted");

  const reconnect = client.reconnect({ documentId: "doc-r", clientId: "A" });
  assert.equal(reconnect.reconnected, true);

  client.disconnect();
  assert.ok(calls.some((entry) => entry[0] === "unsubscribe"));
}
