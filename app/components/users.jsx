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
  getInitialState() {
    return UsersStore.getState();
  },
  componentWillMount() {
    UsersActions.fetch();
  },
  componentDidMount() {
    this.listenTo(UsersStore, () => this.setState(this.getInitialState()));
  },
  removeUser(index) {
    return UsersActions.remove(index);
  },
  renderUsers() {
    return this.state.users.map((user, index) => {
      return (
        <tr key={index}>
          <td>{user.user.email}</td>
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
              <th>action</th>
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
