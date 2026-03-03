export const PreviewStates = {
  IDLE: "idle",
  SUCCESS: "success",
  BLOCKED: "blocked",
  STALE: "stale"
};

export function applyCompileResult(current, result) {
  if (result.status === "succeeded") {
    return {
      status: PreviewStates.SUCCESS,
      currentRevisionId: result.revisionId,
      previewUrl: result.previewUrl,
      reason: null
    };
  }

  if (result.status === "failed") {
    if (current.currentRevisionId) {
      return {
        ...current,
        status: PreviewStates.STALE,
        reason: "preview blocked by compile failure"
      };
    }

    return {
      ...current,
      status: PreviewStates.BLOCKED,
      reason: "preview blocked by compile failure"
    };
  }

  return current;
}
