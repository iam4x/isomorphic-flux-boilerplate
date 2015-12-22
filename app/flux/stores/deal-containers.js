class DealContainersStore {

  constructor() {
    this.bindActions(this.alt.getActions('dealContainers'));

    this.collection = [];
    this.current = {};
    this.error = null;
  }

  onIndexSuccess(resp) {
    this.collection = resp;
    this.error = null;
  }

  onIndexFail({ error }) {
    this.error = error;
  }

  onShowSuccess(resp) {
    this.current = resp;
    this.error = null;
  }

  onShowFail({ error }) {
    this.error = error;
  }

}

export default DealContainersStore;
