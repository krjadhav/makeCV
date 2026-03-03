export function mapCompileErrors(errors) {
  return errors.map((error) => ({
    marker: `${error.line}:${error.column}`,
    message: error.message
  }));
}

const compileMessages = {
  idle: "Ready to compile",
  loading: "Compiling LaTeX document...",
  succeeded: "Compilation succeeded",
  failed: "Compilation failed. Fix highlighted errors and retry."
};

export function createCompilePanelModel(result) {
  if (!result || result.status === "idle") {
    return {
      state: "idle",
      heading: compileMessages.idle,
      markers: []
    };
  }

  if (result.status === "loading" || result.status === "queued") {
    return {
      state: "loading",
      heading: compileMessages.loading,
      markers: []
    };
  }

  if (result.status === "failed") {
    return {
      state: "failed",
      heading: compileMessages.failed,
      markers: mapCompileErrors(result.errors ?? [])
    };
  }

  return {
    state: "succeeded",
    heading: compileMessages.succeeded,
    markers: []
  };
}
