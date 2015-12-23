export function isConnected(flux) {
  return function ({ location: { pathname } }, replaceState) {
    const { session } = flux.getStore('session').getState();
    if (!session) return replaceState(null, `/login?redirect=${pathname}`);
  };
}

export function dealsUrlRedirect(flux) {
  return ({ location: { query: { id }, pathname } }, replaceState) => {
    const state = flux.getStore('dealContainers').getState();
    pathname === '/deals' ? replaceState(state, `/deals/${id}`) : void 0;
  };
}
