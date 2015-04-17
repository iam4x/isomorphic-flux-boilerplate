'use strict';

class RequestsStore {
  constructor() {
    this.bindActions(this.alt.getActions('requests'));
    this.inProgress = false;
  }
  onStart() {
    this.inProgress = true;
  }
  onSuccess() {
    this.inProgress = false;
  }
  onFail() {
    this.inProgress = false;
  }
}

export default RequestsStore;
