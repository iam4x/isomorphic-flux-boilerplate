'use strict';

import React from 'react';
import classNames from 'classnames';
import ListenerMixin from 'alt/mixins/ListenerMixin';

if (process.env.BROWSER) {
  require('styles/spinner.scss');
}

export default React.createClass({
  displayName: 'Spinner',
  mixins: [ListenerMixin],
  propTypes: {
    store: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return this.props.store.getState();
  },
  componentDidMount() {
    this.listenTo(this.props.store, this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.getInitialState());
  },
  render() {
    const klass: string = classNames(
      'app--spinner',
      {active: this.state.inProgress}
    );
    return (
      <div className={klass} />
    );
  }
});
