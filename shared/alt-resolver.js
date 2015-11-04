const { BROWSER, NODE_ENV } = process.env;

class AltResolver {

  firstRender = true
  pendingActions = []

  resolve(action, setImmediate = (NODE_ENV === 'test')) {
    if ((BROWSER && !this.firstRender) || setImmediate) {
      return new Promise(action);
    }

    this.pendingActions = [ ...this.pendingActions, action ];
  }

  async dispatchPendingActions() {
    await* this.pendingActions.map(action => new Promise(action));
  }

}

export default AltResolver;
