class DealsItemsActions {

  constructor() {
    this.generateActions(
      'indexSuccess', 'indexFail',
      'remove'
    );
  }

  index() {
    return (dispatch, { resolve, request }) =>
      resolve(async () => {
        try {
          const response = await request({ url: '/deal_containers' });
          this.actions.indexSuccess(response);
        } catch (error) {
          this.actions.indexFail({ error });
        }
      });
  }

}

export default DealsItemsActions;
