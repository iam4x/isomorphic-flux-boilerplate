class DealContainersStore {

  constructor() {
    this.bindActions(this.alt.getActions('dealContainers'));

    this.collection = [];
    this.error = null;
  }

  onIndexSuccess(dealContainers) {
    this.collection = dealContainers;
    this.error = null;
  }

  onIndexFail({ error }) {
    this.error = error;
  }

  onShowSuccess(user) {
    const index = this.collection
      .findIndex(({ seed }) => seed === user.seed);

    if (index > -1) {
      this.collection = this.collection
        .map((u, idx) => idx === index ? user : u);
    } else {
      this.collection = [ ...this.collection, user ];
    }

    this.error = null;
  }

  onShowFail({ error }) {
    this.error = error;
  }

}

export default DealContainersStore;
