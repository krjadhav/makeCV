import assert from "node:assert/strict";
import { createEditorController } from "../src/editor/EditorPage.js";

const fakeApiClient = {
  async requestCompile() {
    return { compileId: "cmp_1" };
  },
  async getCompileStatus() {
    return {
      status: "succeeded",
      revisionId: "r10",
      previewUrl: "/preview/r10.pdf"
    };
  }
};

export async function runEditorCollabTests() {
  const controller = createEditorController(fakeApiClient);
  controller.handlePresenceJoin({ clientId: "a", name: "Alice" });
  controller.handlePresenceJoin({ clientId: "b", name: "Bob" });

  assert.equal(controller.state.collaborators.count, 2);

  await controller.compileDocument({
    documentId: "doc-1",
    revisionId: "r10",
    source: "\\begin{document}"
  });

  assert.equal(controller.state.preview.status, "success");

  controller.handlePresenceLeave("b");
  assert.equal(controller.state.collaborators.count, 1);
}
