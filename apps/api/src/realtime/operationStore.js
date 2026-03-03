export function createOperationStore() {
  const seen = new Set();

  return {
    has(opId) {
      return seen.has(opId);
    },
    add(opId) {
      seen.add(opId);
    },
    reset() {
      seen.clear();
    }
  };
}
