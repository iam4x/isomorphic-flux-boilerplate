'use strict';

import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {IntlMixin} from 'react-intl';

if (process.env.BROWSER) {
  require('styles/users.scss');
}

export default class Users extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  }

  static propTypes = {
    flux: React.PropTypes.object.isRequired
  }

  _getIntlMessage = IntlMixin.getIntlMessage

  state = this.props.flux
    .getStore('users')
    .getState();

  componentWillMount() {
    this.props.flux
      .getActions('page-title')
      .set(this._getIntlMessage('users.page-title'));

    this.props.flux
      .getActions('users')
      .fetch();
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
  _handleStoreChange(state: Object) {
    return this.setState(state);
  }

  _removeUser(index: number) {
    this.props.flux
      .getActions('users')
      .remove(index);
  }

  _showProfile(seed: string) {
    this.context.router
      .transitionTo('profile', {seed});
  }

  _renderUsers() {
    return this.state.users.map((user, index) => {
      return (
        <tr className='user--row' key={index}>
          <td>{user.user.email}</td>
          <td className='text-center'>
            <button
              onClick={this._showProfile.bind(this, user.seed)}>
              Profile
            </button>
          </td>
          <td className='text-center'>
            <button
              className='user--remove'
              onClick={this._removeUser.bind(this, index)}>
              X
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h1 className='text-center'>
          {this._getIntlMessage('users.title')}
        </h1>
        <table className='app--users'>
          <thead>
            <tr>
              <th>
                {this._getIntlMessage('users.email')}
              </th>
              <th colSpan='2'>
                {this._getIntlMessage('users.actions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {this._renderUsers()}
          </tbody>
        </table>
        <p className='text-center'>
          <button
            ref='add-button'
            onClick={this.props.flux.getActions('users').add}>
            {this._getIntlMessage('users.add')}
          </button>
        </p>
      </div>
    );
  }
}
