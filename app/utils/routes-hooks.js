export function isConnected(flux) {
  return function ({ location: { pathname } }, replace) {
    const { session } = flux.getStore('session').getState();
    if (!session) return replace(null, `/login?redirect=${pathname}`);
  };
}
