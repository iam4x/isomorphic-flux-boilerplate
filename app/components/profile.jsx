'use strict';

import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {IntlMixin} from 'react-intl';
import {capitalize, assign} from 'lodash';

if (process.env.BROWSER) {
  require('styles/profile.scss');
}

export default class Profile extends React.Component {
  static propTypes = {
    flux: React.PropTypes.object.isRequired
  }

  _getIntlMessage = IntlMixin.getIntlMessage
  _formatMessage = IntlMixin.formatMessage.bind(assign({}, this, IntlMixin))

  state = this.props.flux
    .getStore('users')
    .getBySeed(this.props.params.seed)

  componentWillMount() {
    this._setPageTitle();

    this.props.flux
      .getActions('users')
      .fetchBySeed(this.props.params.seed);
  }

  componentDidMount() {
    this.props.flux
      .getStore('users')
      .listen(this._handleStoreChange);
  }

  componentWillUnmount() {
    this.props.flux
      .getStore('users')
      .unlisten(this._handleStoreChange);
  }

  _handleStoreChange = this._handleStoreChange.bind(this)
  _handleStoreChange() {
    const user: ?Object = this.props.flux
      .getStore('users')
      .getBySeed(this.props.params.seed);

    return this.setState(user);
  }

  _setPageTitle = this._setPageTitle.bind(this)
  _setPageTitle() {
    let title: string;

    if (this.state.user) {
      const user: Object = this.state.user.user;
      const fullName: string = this._getFullName(user.name);

      title = this._getIntlMessage('profile.page-title');
      title = this._formatMessage(title, {fullName});

    }
    else {
      title = this._getIntlMessage('profile.not-found-page-title');
    }

    // Set page title
    this.props.flux
      .getActions('page-title')
      .set(title);
  }

  _getFullName({first, last}) {
    return `${capitalize(first)} ${capitalize(last)}`;
  }

  render() {
    if (this.state.user) {
      const user: Object = this.state.user.user;
      return (
        <div className='app--profile'>
          <h2>{this._getFullName(user.name)}</h2>
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
}
