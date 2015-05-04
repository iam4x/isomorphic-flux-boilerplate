'use strict';

class RequestsStore {
  constructor() {
    this.bindActions(this.alt.getActions('requests'));
    this.inProgress = false;
  }

  onStart() {
    this._setInProgress(true);
  }

  onSuccess() {
    this._setInProgress(false);
  }

  onFail() {
    this._setInProgress(false);
  }

  _setInProgress(inProgress: boolean) {
    return this.setState({inProgress});
  }
}

export default RequestsStore;
