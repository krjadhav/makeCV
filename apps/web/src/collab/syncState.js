export function createSyncState() {
  return {
    revisionId: "r0",
    needsResync: false
  };
}

export function applyServerAck(state, ack) {
  if (ack.ack === "conflict") {
    return {
      ...state,
      revisionId: ack.revisionId,
      needsResync: true
    };
  }

  return {
    ...state,
    revisionId: ack.revisionId,
    needsResync: false
  };
}

export function recoverFromSnapshot(state, snapshot) {
  return {
    ...state,
    revisionId: snapshot.revisionId,
    needsResync: false
  };
}
