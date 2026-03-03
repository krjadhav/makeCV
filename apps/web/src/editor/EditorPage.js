import { createCompilePanelModel } from "./CompilePanel.js";
import { applyCompileResult, PreviewStates } from "../state/previewState.js";

export function createEditorController(apiClient) {
  const state = {
    preview: {
      status: PreviewStates.IDLE,
      currentRevisionId: null,
      previewUrl: null,
      reason: null
    },
    diagnostics: []
  };

  return {
    state,
    async compileDocument({ documentId, revisionId, source }) {
      const accepted = await apiClient.requestCompile({ documentId, revisionId, source });
      const result = await apiClient.getCompileStatus(accepted.compileId);

      state.preview = applyCompileResult(state.preview, result);
      state.diagnostics = createCompilePanelModel(result).markers;

      return { ...state };
    }
  };
}
