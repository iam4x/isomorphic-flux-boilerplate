class DealsItemsActions {

  constructor() {
    this.generateActions(
      'indexSuccess', 'indexFail',
      'remove'
    );
  }

  index() {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        try {
          alt.getActions('requests').start();
          const response = await alt.request({ url: '/deal_containers' });
          this.indexSuccess(response);
        } catch (error) {
          this.indexFail({ error });
        }
        alt.getActions('requests').stop();
      });
  }

}

export default DealsItemsActions;
