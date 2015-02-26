'use strict';

import React from 'react';

import UserStore from 'stores/user';

export default React.createClass({
  getInitialState() {
    return UserStore.getState();
  },
  renderUsers() {
    return this.state.users.map((user) => {
      return (
        <li key={user.seed}>
          <strong>{user.user.name}</strong> - {user.user.email}
        </li>
      );
    });
  },
  render() {
    return (
      <div>
        <h1>Users</h1>
        <ul>
          {this.renderUsers()}
        </ul>
      </div>
    );
  }
});
