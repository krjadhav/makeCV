import assert from "node:assert/strict";
import { createSessionClient } from "../src/collab/sessionClient.js";

export function runRealtimeClientTests() {
  const calls = [];
  const adapter = {
    subscribe(params) {
      calls.push(["subscribe", params]);
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
  const joined = client.connect({ documentId: "doc-r", clientId: "A" });
  assert.equal(joined.type, "joined");

  const ack = client.publish({ opId: "op-1" });
  assert.equal(ack.ack, "accepted");

  const reconnect = client.reconnect({ documentId: "doc-r", clientId: "A" });
  assert.equal(reconnect.reconnected, true);

  client.disconnect();
  assert.ok(calls.some((entry) => entry[0] === "unsubscribe"));
}
