export function resolveOperation({ sessionRevisionId, operation, seenOpIds }) {
  if (seenOpIds.has(operation.opId)) {
    return { type: "duplicate", nextRevisionId: sessionRevisionId };
  }

  if (operation.baseRevisionId && operation.baseRevisionId !== sessionRevisionId) {
    return { type: "conflict", nextRevisionId: sessionRevisionId };
  }

  return { type: "accepted", nextRevisionId: operation.revisionId };
}
