import assert from "node:assert/strict";
import { assertEditable, createAccessGuard } from "../src/collab/accessGuard.js";

export function runAccessGuardTests() {
  const viewGuard = createAccessGuard("view");
  assert.equal(viewGuard.canEdit, false);
  assert.equal(viewGuard.editorMode, "read-only");

  const editGuard = createAccessGuard("edit");
  assert.equal(editGuard.canEdit, true);

  const denied = assertEditable("view");
  assert.equal(denied.allowed, false);

  const allowed = assertEditable("edit");
  assert.equal(allowed.allowed, true);
}
