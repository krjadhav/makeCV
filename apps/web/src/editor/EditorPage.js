import { createCompilePanelModel } from "./CompilePanel.js";
import { createCollaboratorBarModel } from "./CollaboratorBar.js";
import { applyCompileResult, PreviewStates } from "../state/previewState.js";
import { createPresenceStore } from "../collab/presenceStore.js";

export function createEditorController(apiClient) {
  const presence = createPresenceStore();
  const state = {
    preview: {
      status: PreviewStates.IDLE,
      currentRevisionId: null,
      previewUrl: null,
      reason: "Ready to compile"
    },
    compileUi: createCompilePanelModel({ status: "idle" }),
    diagnostics: [],
    collaborators: createCollaboratorBarModel([])
  };

  return {
    state,
    async compileDocument({ documentId, revisionId, source }) {
      state.compileUi = createCompilePanelModel({ status: "loading" });

      const accepted = await apiClient.requestCompile({ documentId, revisionId, source });
      const result = await apiClient.getCompileStatus(accepted.compileId);

      state.preview = applyCompileResult(state.preview, result);
      state.compileUi = createCompilePanelModel(result);
      state.diagnostics = state.compileUi.markers;

      return { ...state };
    },
    handlePresenceJoin(member) {
      presence.join(member);
      state.collaborators = createCollaboratorBarModel(presence.list());
      return state.collaborators;
    },
    handlePresenceLeave(clientId) {
      presence.leave(clientId);
      state.collaborators = createCollaboratorBarModel(presence.list());
      return state.collaborators;
    },
    handlePresenceHeartbeat(clientId) {
      presence.heartbeat(clientId);
      state.collaborators = createCollaboratorBarModel(presence.list());
      return state.collaborators;
    }
  };
}
