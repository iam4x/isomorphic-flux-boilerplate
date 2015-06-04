import React, {Component} from 'react';
import AltIso from 'alt/utils/AltIso';
import {Link} from 'react-router';
import {IntlMixin} from 'react-intl';
import {replaceParams} from 'utils/localized-routes';

import UsersStore from 'flux/stores/users';
import UsersActions from 'flux/actions/users';
import PageTitleActions from 'flux/actions/page-title';

if (process.env.BROWSER) {
  require('styles/users.scss');
}

@AltIso.define(() => UsersStore.fetch())
class Users extends Component {

  _getIntlMessage = IntlMixin.getIntlMessage

  state = UsersStore.getState();

  componentWillMount() {
    PageTitleActions.set(this._getIntlMessage('users.page-title'));
  }

  componentDidMount() {
    UsersStore.listen(this._handleStoreChange);
  }

  componentWillUnmount() {
    UsersStore.unlisten(this._handleStoreChange);
  }

  _handleStoreChange = ::this._handleStoreChange
  _handleStoreChange(state) {
    return this.setState(state);
  }

  _removeUser(index: number) {
    UsersActions.remove(index);
  }

  renderUser = ::this.renderUser
  renderUser(user, index) {
    const profileRoute = replaceParams(
      this._getIntlMessage('routes.profile'),
      {seed: user.seed}
    );
    return (
      <tr className='user--row' key={index}>
        <td>{user.user.email}</td>
        <td className='text-center'>
          <Link to={profileRoute}>Profile</Link>
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
            {
              this.state.users
                .map(this.renderUser)
            }
          </tbody>
        </table>
        <p className='text-center'>
          <button
            ref='add-button'
            onClick={UsersStore.add}>
            {this._getIntlMessage('users.add')}
          </button>
        </p>
      </div>
    );
  }

}

export default Users;
