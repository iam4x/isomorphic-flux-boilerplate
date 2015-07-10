import alt from 'utils/alt';
import RequestsActions from 'flux/actions/requests';

class RequestsStore {

  static displayName = 'RequestsStore'

  requestsCount = 0
  inProgress = false

  constructor() {
    this.bindActions(RequestsActions);
  }

  onStart() {
    this.setState({
      inProgress: true,
      requestsCount: this.requestsCount + 1
    });
  }

  onSuccess() {
    const count = this.requestsCount - 1;
    this.setState({
      inProgress: count > 0,
      requestsCount: count
    });
  }

  onFail() {
    const count = this.requestsCount - 1;
    this.setState({
      inProgress: count > 0,
      requestsCount: count
    });
  }

}

export default alt.createStore(RequestsStore);
