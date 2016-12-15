/* eslint import/prefer-default-export: 0 */

export const isConnected = (flux) => ({ location: { pathname } }, replace) => {
  const { session } = flux.getStore('session').getState()
  if (!session) replace(null, `/login?redirect=${pathname}`)
}
