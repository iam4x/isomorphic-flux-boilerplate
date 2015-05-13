'use strict';

import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {IntlMixin} from 'react-intl';
import {capitalize} from 'lodash';

if (process.env.BROWSER) {
  require('styles/profile.scss');
}

export default React.createClass({
  displayName: 'Profile',
  mixins: [ListenerMixin, IntlMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    flux: React.PropTypes.object.isRequired
  },
  getInitialState() {
    const seed: string = this.context.router.getCurrentParams().seed;
    return this.props.flux.getStore('users').getBySeed(seed);
  },
  componentWillMount() {
    // Set page title
    this.setPageTitle();

    // Fetch user
    const seed: string = this.context.router.getCurrentParams().seed;
    return this.props.flux.getActions('users').fetchBySeed(seed);
  },
  componentDidMount() {
    this.listenTo(this.props.flux.getStore('users'), this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.getInitialState());
  },
  setPageTitle() {
    let title: string;

    if (this.state.user) {
      const user: Object = this.state.user.user;
      const fullName: string = this.getFullName(user.name);

      title = this.getIntlMessage('profile.page-title');
      title = this.formatMessage(title, {fullName});

    }
    else {
      title = this.getIntlMessage('profile.not-found-page-title');
    }

    // Set page title
    this.props.flux
      .getActions('page-title')
      .set(title);
  },
  getFullName(name: Object) {
    return `${capitalize(name.first)} ${capitalize(name.last)}`;
  },
  render() {
    if (this.state.user) {
      const user: Object = this.state.user.user;
      return (
        <div className='app--profile'>
          <h2>{this.getFullName(user.name)}</h2>
          <img
            src={user.picture.medium}
            alt='profile picture' />
        </div>
      );
    }
    else {
      return (
        <h2>User not found</h2>
      );
    }
  }
});
