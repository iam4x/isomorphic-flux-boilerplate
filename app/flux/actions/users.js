class UsersActions {

  constructor() {
    this.generateActions(
      'indexSuccess', 'indexFail',
      'showSuccess', 'showFail',
      'remove'
    );
  }

  index() {
    // You need to return a fn in actions
    // to get alt instance as second parameter to access
    // `alt-resolver` and the ApiClient
    return (dispatch, alt) =>
      // We use `alt-resolver` from the boilerplate
      // to indicate the server we need to resolve
      // this data before server side rendering
      alt.resolve(async () => {
        try {
          alt.getActions('requests').start();
          const response = await alt.request({ url: '/users' });
          this.indexSuccess(response);
        } catch (error) {
          this.indexFail({ error });
        }
        alt.getActions('requests').stop();
      });
  }

  show(seed) {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        try {
          alt.getActions('requests').start();
          const response = await alt.request({ url: `/users/${seed}` });
          this.showSuccess(response);
        } catch (error) {
          this.showFail({ error });
        }
        alt.getActions('requests').stop();
      });
  }

}

export default UsersActions;
