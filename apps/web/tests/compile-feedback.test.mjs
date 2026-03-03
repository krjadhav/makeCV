import assert from "node:assert/strict";
import { createEditorController } from "../src/editor/EditorPage.js";

const fakeApiClient = {
  async requestCompile() {
    return { compileId: "cmp_1" };
  },
  async getCompileStatus() {
    return {
      status: "failed",
      errors: [{ line: 12, column: 4, message: "unexpected token" }]
    };
  }
};

export async function runCompileFeedbackTests() {
  const controller = createEditorController(fakeApiClient);
  const state = await controller.compileDocument({
    documentId: "doc-1",
    revisionId: "r2",
    source: "bad latex"
  });

  assert.equal(state.preview.status, "blocked");
  assert.equal(state.compileUi.state, "failed");
  assert.match(state.compileUi.heading, /Fix highlighted errors/);
  assert.equal(state.diagnostics[0].marker, "12:4");
  assert.equal(state.diagnostics[0].message, "unexpected token");
}
