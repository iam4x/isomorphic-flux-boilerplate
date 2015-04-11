'use strict';

import request from 'superagent';
import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';

import UsersStore from 'stores/users';
import UsersActions from 'actions/users';

if (process.env.BROWSER) {
  require('styles/users.scss');
}

export default React.createClass({
  mixins: [ListenerMixin],
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
    this.listenTo(UsersStore, () => this.setState(this.getInitialState()));
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
        <tr key={index}>
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
        <h1 className='text-center'>Users</h1>
        <table className='app--users'>
          <thead>
            <tr>
              <th>email</th>
              <th colSpan='2'>
                actions
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderUsers()}
          </tbody>
        </table>
        <p className='text-center'>
          <button onClick={UsersActions.add}>
            Add User
          </button>
        </p>
      </div>
    );
  }
});
