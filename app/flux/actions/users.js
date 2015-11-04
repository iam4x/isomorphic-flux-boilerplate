class UsersActions {

  constructor() {
    this.generateActions(
      'indexSuccess', 'indexFail',
      'showSuccess', 'showFail',
      'remove'
    );
  }

  index() {
    this.alt.resolve(async (done) => {
      try {
        this.alt.getActions('requests').start();
        const response = await this.alt.request({ url: '/users' });
        this.actions.indexSuccess(response);
      } catch (error) {
        this.actions.indexFail({ error });
      }
      this.alt.getActions('requests').stop();
      return done();
    });
  }

  show(seed) {
    this.alt.resolve(async (done) => {
      try {
        this.alt.getActions('requests').start();
        const response = await this.alt.request({ url: '/users/' + seed });
        this.actions.showSuccess(response);
      } catch (error) {
        this.actions.showFail({ error });
      }
      this.alt.getActions('requests').stop();
      return done();
    });
  }

}

export default UsersActions;
