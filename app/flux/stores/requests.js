class RequestsStore {

  constructor() {
    this.bindActions(this.alt.getActions('requests'));
    this.inProgress = false;
  }

  onStart() {
    this.inProgress = true;
  }

  onStop() {
    this.inProgress = false;
  }
}

export default RequestsStore;
