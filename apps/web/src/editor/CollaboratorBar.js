export function createCollaboratorBarModel(members) {
  return {
    count: members.length,
    names: members.map((m) => m.name)
  };
}
