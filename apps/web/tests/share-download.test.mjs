import assert from "node:assert/strict";
import { getDownloadButtonState } from "../src/editor/DownloadButton.js";
import { buildShareRequest, createShareDialogModel, mapShareError } from "../src/editor/ShareDialog.js";

export function runShareDownloadTests() {
  const disabled = getDownloadButtonState({ previewStatus: "blocked", hasPdfUrl: false });
  assert.equal(disabled.enabled, false);
  assert.match(disabled.message, /Fix compile errors/);

  const enabled = getDownloadButtonState({ previewStatus: "success", hasPdfUrl: true });
  assert.equal(enabled.enabled, true);
  assert.equal(enabled.label, "Download PDF");

  const model = createShareDialogModel("edit");
  assert.equal(model.canSubmit, true);
  assert.equal(model.status, "ready");

  const payload = buildShareRequest("view");
  assert.equal(payload.permission, "view");
  assert.match(mapShareError("forbidden"), /do not have access/);
}
