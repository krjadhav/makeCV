import assert from "node:assert/strict";
import { getPdfDownload } from "../src/routes/download.js";
import { createShareLink, resetShareState, resolveShareLink } from "../src/routes/shareLinks.js";
import { requestCompile, resetCompileState } from "../src/services/compileService.js";

export function runDownloadShareTests() {
  resetCompileState();
  resetShareState();

  const unavailable = getPdfDownload("doc-2");
  assert.equal(unavailable.statusCode, 409);

  requestCompile({
    documentId: "doc-2",
    revisionId: "r1",
    source: "\\begin{document}\\nhello"
  });

  const available = getPdfDownload("doc-2");
  assert.equal(available.statusCode, 200);
  assert.match(available.body.pdfUrl, /download\.pdf$/);

  const viewLink = createShareLink({ documentId: "doc-2", permission: "view" });
  const token = viewLink.url.split("/").at(-1);
  const resolved = resolveShareLink(token);
  assert.equal(resolved.permission, "view");
}
