class DealsItemsActions {

  constructor() {
    this.generateActions(
      'indexSuccess', 'indexFail',
      'showSuccess', 'showFail'
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

  show(id) {
    return (dispatch, alt) =>
      alt.resolve(async () => {
        try {
          const response = await alt.request({ url: `/deal_containers/${id}` });
          !response.error ?
            this.showSuccess(response) :
            this.indexFail(response);
        } catch (error) {
          this.indexFail({ error });
        }
      });
  }

}

export default DealsItemsActions;
