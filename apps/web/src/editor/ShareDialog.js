const shareErrors = {
  invalid_permission: "Sharing failed: invalid permission selection",
  forbidden: "Sharing failed: you do not have access"
};

export function createShareDialogModel(defaultPermission = "view") {
  const isValid = defaultPermission === "view" || defaultPermission === "edit";
  return {
    selectedPermission: defaultPermission,
    canSubmit: isValid,
    status: isValid ? "ready" : "error",
    message: isValid ? "Create a share link" : shareErrors.invalid_permission
  };
}

export function buildShareRequest(permission) {
  if (permission !== "view" && permission !== "edit") {
    throw new Error(shareErrors.invalid_permission);
  }

  return { permission };
}

export function mapShareError(code) {
  return shareErrors[code] ?? "Sharing failed: unknown error";
}
