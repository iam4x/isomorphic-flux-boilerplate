export function isConnected(flux) {
  return function ({ location: { pathname } }, replaceState) {
    const { session } = flux.getStore('session').getState();
    if (!session) replaceState(null, `/login?redirect=${pathname}`);
  };
}
