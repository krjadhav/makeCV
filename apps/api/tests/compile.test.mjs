import assert from "node:assert/strict";
import { getCompile, postCompile } from "../src/routes/compile.js";
import { getLatestSuccessfulArtifact, resetCompileState } from "../src/services/compileService.js";

export function runCompileTests() {
  resetCompileState();

  const accepted = postCompile({
    documentId: "doc-1",
    revisionId: "r1",
    source: "\\begin{document}\\nHello world"
  });

  assert.equal(accepted.status, "queued");
  const status = getCompile(accepted.compileId);
  assert.equal(status.status, "succeeded");
  assert.equal(status.revisionId, "r1");
  assert.match(status.previewUrl, /preview\.pdf$/);

  const artifact = getLatestSuccessfulArtifact("doc-1");
  assert.equal(artifact.revisionId, "r1");

  const failedAccepted = postCompile({
    documentId: "doc-1",
    revisionId: "r2",
    source: "Broken } latex"
  });

  const failedStatus = getCompile(failedAccepted.compileId);
  assert.equal(failedStatus.status, "failed");
  assert.ok(Array.isArray(failedStatus.errors));
  assert.equal(typeof failedStatus.errors[0].line, "number");
  assert.equal(typeof failedStatus.errors[0].column, "number");
  assert.equal(typeof failedStatus.errors[0].message, "string");
}
