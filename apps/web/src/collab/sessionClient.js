export function createSessionClient(adapter) {
  let subscription = null;

  return {
    connect(params) {
      subscription = adapter.subscribe(params);
      return subscription.joined;
    },
    publish(operation) {
      return adapter.publish(operation);
    },
    reconnect(params) {
      if (subscription?.unsubscribe) {
        subscription.unsubscribe();
      }
      subscription = adapter.subscribe(params);
      return { reconnected: true, joined: subscription.joined };
    },
    disconnect() {
      if (subscription?.unsubscribe) {
        subscription.unsubscribe();
      }
      subscription = null;
    }
  };
}
