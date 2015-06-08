'use strict';

import React from 'react';
import classNames from 'classnames';
import ListenerMixin from 'alt/mixins/ListenerMixin';

if (process.env.BROWSER) {
  require('styles/spinner.scss');
}

export default class Spinner extends React.Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired
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
