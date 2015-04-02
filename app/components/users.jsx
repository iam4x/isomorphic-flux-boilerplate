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
      .end((res) => UserActions.add(res.body.results[0]));
  },
  renderUsers() {
    return this.state.users.map((user, index) => {
      let boundRemove = () => UserActions.remove(index);
      return (
        <li key={user.seed}>
          <strong>
            {user.user.name}
          </strong>
          {` - ${user.user.email} - `}
          <button onClick={boundRemove}>X</button>
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
