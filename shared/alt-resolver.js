const { BROWSER, NODE_ENV } = process.env

class AltResolver {

  firstRender = true
  pendingActions = []

  resolve(action, setImmediate = (NODE_ENV === 'test')) {
    /* istanbul ignore else */
    if ((BROWSER && !this.firstRender) || setImmediate) {
      action()
    } else {
      this.pendingActions = [ ...this.pendingActions, action ]
    }
  }

  /* istanbul ignore next */
  /* eslint no-restricted-syntax: 0 */
  async dispatchPendingActions() {
    for (const action of this.pendingActions) await action()
  }

}

export default AltResolver
