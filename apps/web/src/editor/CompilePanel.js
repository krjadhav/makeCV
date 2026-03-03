export function mapCompileErrors(errors) {
  return errors.map((error) => ({
    marker: `${error.line}:${error.column}`,
    message: error.message
  }));
}

export function createCompilePanelModel(result) {
  if (result.status === "failed") {
    return {
      heading: "Compilation failed",
      markers: mapCompileErrors(result.errors)
    };
  }

  return {
    heading: "Compilation succeeded",
    markers: []
  };
}
