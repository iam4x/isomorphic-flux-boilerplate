'use strict';

import request from 'superagent';
import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';

import UsersStore from 'stores/users';
import UsersActions from 'actions/users';

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
        <li key={index}>
          <strong>{user.user.email}</strong>
          {` `}
          <button onClick={this.removeUser.bind(this, index)}>X</button>
        </li>
      );
    });
  },
  render() {
    return (
      <div>
        <h1>Users <button onClick={UsersActions.add}>Add User</button></h1>
        <ul>
          {this.renderUsers()}
        </ul>
      </div>
    );
  }
});
