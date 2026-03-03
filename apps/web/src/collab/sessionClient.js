export function createSessionClient(adapter) {
  let subscription = null;

  const connect = (params) => {
    subscription = adapter.subscribe(params);
    return subscription.joined;
  };

  return {
    connect,
    publish(operation) {
      return adapter.publish(operation);
    },
    reconnect(params) {
      if (subscription?.unsubscribe) {
        subscription.unsubscribe();
      }
      subscription = adapter.subscribe(params);
      return { reconnected: true, joined: subscription.joined, attempts: 1 };
    },
    reconnectWithRetry(params, options = {}) {
      const maxRetries = options.maxRetries ?? 3;
      let attempts = 0;
      let lastError = null;

      while (attempts < maxRetries) {
        attempts += 1;
        try {
          if (subscription?.unsubscribe) {
            subscription.unsubscribe();
          }
          subscription = adapter.subscribe(params);
          return { reconnected: true, joined: subscription.joined, attempts };
        } catch (error) {
          lastError = error;
        }
      }

      return {
        reconnected: false,
        attempts,
        error: lastError?.message ?? "reconnect failed"
      };
    },
    disconnect() {
      if (subscription?.unsubscribe) {
        subscription.unsubscribe();
      }
      subscription = null;
    }
  };
}
