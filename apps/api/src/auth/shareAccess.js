export function canJoinSession(permission) {
  return permission === "view" || permission === "edit";
}

export function canMutate(permission) {
  return permission === "edit";
}

export function assertCanMutate(permission) {
  if (!canMutate(permission)) {
    return {
      allowed: false,
      reason: "read-only access"
    };
  }

  return { allowed: true };
}
