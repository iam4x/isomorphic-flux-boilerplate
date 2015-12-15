class UsersActions {

  constructor() {
    this.generateActions(
      'indexSuccess', 'indexFail',
      'showSuccess', 'showFail',
      'remove'
    );
  }

  index() {
    this._flux.resolve(async (done) => {
      try {
        this._flux.getActions('requests').start();
        const response = await this._flux.request({ url: '/users' });
        this.indexSuccess(response);
      } catch (error) {
        this.indexFail({ error });
      }
      this._flux.getActions('requests').stop();
      return done();
    });
  }

  show(seed) {
    this._flux.resolve(async (done) => {
      try {
        this._flux.getActions('requests').start();
        const response = await this._flux.request({ url: '/users/' + seed });
        this.showSuccess(response);
      } catch (error) {
        this.showFail({ error });
      }
      this._flux.getActions('requests').stop();
      return done();
    });
  }

}

export default UsersActions;
