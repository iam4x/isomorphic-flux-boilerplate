export function isConnected(flux) {
  return function(nextState, replaceState) {
    const { session } = flux.getStore('session').getState();
    if (!session) return replaceState(null, '/login');
  };
}
