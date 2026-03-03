import assert from "node:assert/strict";
import { getDownloadButtonState } from "../src/editor/DownloadButton.js";
import { buildShareRequest, createShareDialogModel } from "../src/editor/ShareDialog.js";

export function runShareDownloadTests() {
  const disabled = getDownloadButtonState({ previewStatus: "blocked", hasPdfUrl: false });
  assert.equal(disabled.enabled, false);

  const enabled = getDownloadButtonState({ previewStatus: "success", hasPdfUrl: true });
  assert.equal(enabled.enabled, true);

  const model = createShareDialogModel("edit");
  assert.equal(model.canSubmit, true);

  const payload = buildShareRequest("view");
  assert.equal(payload.permission, "view");
}
