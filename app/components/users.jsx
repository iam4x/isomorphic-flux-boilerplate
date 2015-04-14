'use strict';

import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {IntlMixin} from 'react-intl';

import UsersStore from 'stores/users';
import UsersActions from 'actions/users';

if (process.env.BROWSER) {
  require('styles/users.scss');
}

export default React.createClass({
  displayName: 'UsersList',
  mixins: [ListenerMixin, IntlMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState() {
    return UsersStore.getState();
  },
  componentWillMount() {
    return UsersActions.fetch();
  },
  componentDidMount() {
    this.listenTo(UsersStore, this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.getInitialState());
  },
  removeUser(index) {
    return UsersActions.remove(index);
  },
  showProfile(seed) {
    return this.context.router.transitionTo('profile', {seed});
  },
  renderUsers() {
    return this.state.users.map((user, index) => {
      return (
        <tr className='user--row' key={index}>
          <td>{user.user.email}</td>
          <td className='text-center'>
            <button
              onClick={this.showProfile.bind(this, user.seed)}>
              Profile
            </button>
          </td>
          <td className='text-center'>
            <button
              onClick={this.removeUser.bind(this, index)}>
              X
            </button>
          </td>
        </tr>
      );
    });
  },
  render() {
    return (
      <div>
        <h1 className='text-center'>{this.getIntlMessage('users.title')}</h1>
        <table className='app--users'>
          <thead>
            <tr>
              <th>{this.getIntlMessage('users.email')}</th>
              <th colSpan='2'>
                {this.getIntlMessage('users.actions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderUsers()}
          </tbody>
        </table>
        <p className='text-center'>
          <button
            ref='add-button'
            onClick={UsersActions.add}>
            {this.getIntlMessage('users.add')}
          </button>
        </p>
      </div>
    );
  }
});
