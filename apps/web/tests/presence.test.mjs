import assert from "node:assert/strict";
import { createPresenceStore } from "../src/collab/presenceStore.js";

export function runPresenceTests() {
  const store = createPresenceStore();
  store.join({ clientId: "a", name: "Alice" });
  store.join({ clientId: "b", name: "Bob" });
  assert.equal(store.list().length, 2);

  store.heartbeat("a");
  store.leave("b");
  assert.equal(store.list().length, 1);
  assert.equal(store.list()[0].name, "Alice");
}
