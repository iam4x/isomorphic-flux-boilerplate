'use strict';

import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {IntlMixin} from 'react-intl';

if (process.env.BROWSER) {
  require('styles/users.scss');
}

export default React.createClass({
  displayName: 'UsersList',
  mixins: [ListenerMixin, IntlMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    flux: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return this.props.flux.getStore('users').getState();
  },
  componentWillMount() {
    return this.props.flux.getActions('users').fetch();
  },
  componentDidMount() {
    this.listenTo(this.props.flux.getStore('users'), this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.getInitialState());
  },
  removeUser(index: number) {
    return this.props.flux.getActions('users').remove(index);
  },
  showProfile(seed: string) {
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
              className='user--remove'
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
            onClick={this.props.flux.getActions('users').add}>
            {this.getIntlMessage('users.add')}
          </button>
        </p>
      </div>
    );
  }
});
