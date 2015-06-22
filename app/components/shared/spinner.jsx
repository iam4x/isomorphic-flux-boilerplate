import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

if (process.env.BROWSER) {
  require('styles/spinner.scss');
}

class Spinner extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props: ?Object = {}) {
    super(props);

    this.state = props.store.getState();
  }

  componentDidMount() {
    this.props.store.listen(this._handleStoreChange);
  }

  componentWillUnmount() {
    this.props.store.unlisten(this._handleStoreChange);
  }

  _handleStoreChange = this._handleStoreChange.bind(this)
  _handleStoreChange(state: Object = {}) {
    return this.setState(state);
  }

  render() {
    const klass: string = classNames('app--spinner', {active: this.state.inProgress});

    return (<div className={klass} />);
  }
}

export default Spinner;
