'use strict';

import React from 'react';
import {RouteHandler} from 'react-router';
import ListenerMixin from 'alt/mixins/ListenerMixin';

import LocaleStore from 'stores/locale';

import Header from 'components/header';

if (process.env.BROWSER) {
  require('styles/main.scss');
}

export default React.createClass({
  displayName: 'App',
  mixins: [ListenerMixin],
  getInitialState() {
    return LocaleStore.getState();
  },
  componentDidMount() {
    this.listenTo(LocaleStore, this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(LocaleStore.getState());
  },
  render() {
    return (
      <div>
        <Header {...this.state} />
        <RouteHandler {...this.state} />
      </div>
    );
  }
});
