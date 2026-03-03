import assert from "node:assert/strict";
import { getCompile, postCompile } from "../src/routes/compile.js";
import { getLatestSuccessfulArtifact, resetCompileState } from "../src/services/compileService.js";

export function runCompileTests() {
  resetCompileState();

  const badPayload = postCompile({ documentId: "", revisionId: "", source: "" });
  assert.equal(badPayload.statusCode, 400);
  assert.equal(badPayload.body.error.code, "validation_error");

  const accepted = postCompile({
    documentId: "doc-1",
    revisionId: "r1",
    source: "\\begin{document}\\nHello world"
  });

  assert.equal(accepted.statusCode, 202);
  assert.equal(accepted.body.status, "queued");
  const status = getCompile(accepted.body.compileId);
  assert.equal(status.statusCode, 200);
  assert.equal(status.body.status, "succeeded");
  assert.equal(status.body.revisionId, "r1");
  assert.match(status.body.previewUrl, /preview\.pdf$/);

  const artifact = getLatestSuccessfulArtifact("doc-1");
  assert.equal(artifact.revisionId, "r1");

  const failedAccepted = postCompile({
    documentId: "doc-1",
    revisionId: "r2",
    source: "Broken } latex"
  });

  const failedStatus = getCompile(failedAccepted.body.compileId);
  assert.equal(failedStatus.statusCode, 200);
  assert.equal(failedStatus.body.status, "failed");
  assert.ok(Array.isArray(failedStatus.body.errors));
  assert.equal(typeof failedStatus.body.errors[0].line, "number");
  assert.equal(typeof failedStatus.body.errors[0].column, "number");
  assert.equal(typeof failedStatus.body.errors[0].message, "string");

  const missing = getCompile("missing");
  assert.equal(missing.statusCode, 404);
}
