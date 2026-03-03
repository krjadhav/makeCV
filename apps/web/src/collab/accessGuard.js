export function createAccessGuard(permission) {
  return {
    permission,
    canEdit: permission === "edit",
    editorMode: permission === "edit" ? "editable" : "read-only"
  };
}

export function assertEditable(permission) {
  if (permission !== "edit") {
    return { allowed: false, reason: "read-only" };
  }

  return { allowed: true };
}
