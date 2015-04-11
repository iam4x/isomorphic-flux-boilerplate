'use strict';

import React from 'react';
import classNames from 'classnames';
import ListenerMixin from 'alt/mixins/ListenerMixin';

import RequestsStore from 'stores/requests';

if (process.env.BROWSER) {
  require('styles/spinner.scss');
}

export default React.createClass({
  mixins: [ListenerMixin],
  getInitialState() {
    return RequestsStore.getState();
  },
  componentDidMount() {
    this.listenTo(RequestsStore, () => this.setState(this.getInitialState()));
  },
  render() {
    const klass = classNames(
      'app--spinner',
      {active: this.state.inProgress}
    );
    return (
      <div className={klass} />
    );
  }
});
