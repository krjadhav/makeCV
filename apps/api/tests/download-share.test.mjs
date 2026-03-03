import assert from "node:assert/strict";
import { getPdfDownload } from "../src/routes/download.js";
import { createShareLink, resetShareState, resolveShareLink } from "../src/routes/shareLinks.js";
import { requestCompile, resetCompileState } from "../src/services/compileService.js";

export function runDownloadShareTests() {
  resetCompileState();
  resetShareState();

  const badDownload = getPdfDownload("");
  assert.equal(badDownload.statusCode, 400);
  assert.equal(badDownload.body.error.code, "validation_error");

  const unavailable = getPdfDownload("doc-2");
  assert.equal(unavailable.statusCode, 409);
  assert.equal(unavailable.body.error.code, "compile_required");

  requestCompile({
    documentId: "doc-2",
    revisionId: "r1",
    source: "\\begin{document}\\nhello"
  });

  const available = getPdfDownload("doc-2");
  assert.equal(available.statusCode, 200);
  assert.match(available.body.pdfUrl, /download\.pdf$/);

  const badShare = createShareLink({ documentId: "doc-2", permission: "owner" });
  assert.equal(badShare.statusCode, 400);

  const viewLink = createShareLink({ documentId: "doc-2", permission: "view" });
  assert.equal(viewLink.statusCode, 201);

  const token = viewLink.body.url.split("/").at(-1);
  const resolved = resolveShareLink(token);
  assert.equal(resolved.statusCode, 200);
  assert.equal(resolved.body.permission, "view");
}
