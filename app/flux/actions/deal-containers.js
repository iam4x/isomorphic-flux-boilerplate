class DealsItemsActions {

  constructor() {
    this.generateActions(
      'indexSuccess', 'indexFail',
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

}

export default DealsItemsActions;
