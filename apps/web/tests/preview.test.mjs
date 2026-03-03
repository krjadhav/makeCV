import assert from "node:assert/strict";
import { applyCompileResult, PreviewStates } from "../src/state/previewState.js";

export function runPreviewTests() {
  const initial = {
    status: PreviewStates.IDLE,
    currentRevisionId: null,
    previewUrl: null,
    reason: null
  };

  const blocked = applyCompileResult(initial, {
    status: "failed",
    errors: [{ line: 1, column: 1, message: "x" }]
  });
  assert.equal(blocked.status, PreviewStates.BLOCKED);
  assert.match(blocked.reason, /preview blocked/);

  const success = applyCompileResult(initial, {
    status: "succeeded",
    revisionId: "r1",
    previewUrl: "/preview/r1.pdf"
  });
  assert.equal(success.status, PreviewStates.SUCCESS);

  const stale = applyCompileResult(success, {
    status: "failed",
    errors: [{ line: 2, column: 2, message: "broken" }]
  });
  assert.equal(stale.status, PreviewStates.STALE);
  assert.match(stale.reason, /preview blocked/);
}
