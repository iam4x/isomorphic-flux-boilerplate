export function isConnected(flux) {
  return function ({ location: { pathname } }, replaceState) {
    const { session } = flux.getStore('session').getState();
    if (!session) return replaceState(null, `/login?redirect=${pathname}`);
  };
}
