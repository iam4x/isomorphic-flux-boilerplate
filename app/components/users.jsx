import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { IntlMixin } from 'react-intl';
import { replaceParams } from 'utils/localized-routes';

class Users extends Component {

  static propTypes = {
    flux: PropTypes.object.isRequired
  }

  _getIntlMessage = IntlMixin.getIntlMessage

  state = this.props.flux
    .getStore('users')
    .getState()

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

  _handleStoreChange = (state) => {
    return this.setState(state);
  }

  _removeUser(index) {
    this.props.flux
      .getActions('users')
      .remove(index);
  }

  renderUser = (user, index) => {
    const profileRoute = replaceParams(
      this._getIntlMessage('routes.profile'),
      { seed: user.seed }
    );
    return (
      <tr className='user--row' key={ index }>
        <td>{ user.user.email }</td>
        <td className='text-center'>
          <Link to={ profileRoute }>Profile</Link>
        </td>
        <td className='text-center'>
          <button
            className='user--remove'
            onClick={ this._removeUser.bind(this, index) }>
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
          { this._getIntlMessage('users.title') }
        </h1>
        <table className='app--users'>
          <thead>
            <tr>
              <th>
                { this._getIntlMessage('users.email') }
              </th>
              <th colSpan='2'>
                { this._getIntlMessage('users.actions') }
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
            className='add--button'
            onClick={ this.props.flux.getActions('users').add }>
            { this._getIntlMessage('users.add') }
          </button>
        </p>
      </div>
    );
  }

}

export default Users;
