'use strict';

import request from 'superagent';
import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';

import UserStore from 'stores/user';
import UserActions from 'actions/user';

export default React.createClass({
  mixins: [ListenerMixin],
  getInitialState() {
    return UserStore.getState();
  },
  componentDidMount() {
    this.listenTo(UserStore, () => this.setState(this.getInitialState()));
  },
  addUser() {
    request
      .get('http://api.randomuser.me/')
      .end((err, res) => {
        if (!err) {
          return UserActions.add(res.body.results[0]);
        }
      });
  },
  removeUser(index) {
    return UserActions.remove(index);
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
        <h1>Users <button onClick={this.addUser}>Add User</button></h1>
        <ul>
          {this.renderUsers()}
        </ul>
      </div>
    );
  }
});
