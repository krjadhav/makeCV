export function createPresenceStore() {
  const members = new Map();

  return {
    join(member) {
      members.set(member.clientId, {
        ...member,
        lastSeenAt: Date.now()
      });
    },
    heartbeat(clientId) {
      const member = members.get(clientId);
      if (member) {
        members.set(clientId, { ...member, lastSeenAt: Date.now() });
      }
    },
    leave(clientId) {
      members.delete(clientId);
    },
    list() {
      return Array.from(members.values());
    }
  };
}
