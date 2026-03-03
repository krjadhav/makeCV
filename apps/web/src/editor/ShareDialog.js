export function createShareDialogModel(defaultPermission = "view") {
  return {
    selectedPermission: defaultPermission,
    canSubmit: defaultPermission === "view" || defaultPermission === "edit"
  };
}

export function buildShareRequest(permission) {
  if (permission !== "view" && permission !== "edit") {
    throw new Error("invalid share permission");
  }

  return { permission };
}
