import data from 'data/users.json';

class DealsItemsActions {

  constructor() {
    this.generateActions('fetchSuccess');
  }

  fetch() {
    const promise = (resolve) => {
      this.alt.getActions('requests').start();
      setTimeout(() => {
        this.actions.fetchSuccess(data.users);
        this.alt.getActions('requests').success();
        return resolve();
      }, 300);
    };
    this.alt.resolve(promise);
  }

}

export default DealsItemsActions;
