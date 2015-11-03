import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';
import { Link } from 'react-router';
import { IntlMixin } from 'react-intl';

import { replaceParams } from 'utils/localized-routes';

@connect(({ users }) => ({ ...users }))
class Users extends Component {

  static propTypes = { users: PropTypes.array.isRequired }

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  }

  i18n = IntlMixin.getIntlMessage

  componentWillMount() {
    const { flux } = this.context;

    flux.getActions('page-title').set(this.i18n('users.page-title'));
    flux.getActions('users').fetch();
  }

  handleRemove(index) {
    const { flux } = this.context;
    flux.getActions('users').remove(index);
  }

  handleAdd() {
    const { flux } = this.context;
    flux.getActions('users').add();
  }

  renderUser = (user, index) => {
    const profileRoute = replaceParams(this.i18n('routes.profile'), { seed: user.seed });
    return (
      <tr className='user--row' key={ index }>
        <td>{ user.user.email }</td>
        <td className='text-center'>
          <Link to={ profileRoute }>Profile</Link>
        </td>
        <td className='text-center'>
          <button
            className='user--remove'
            onClick={ () => this.handleRemove(index) }>
            X
          </button>
        </td>
      </tr>
    );
  }

  render() {
    const { users } = this.props;

    return (
      <div>
        <h1 className='text-center'>
          { this.i18n('users.title') }
        </h1>
        <table className='app--users'>
          <thead>
            <tr>
              <th> { this.i18n('users.email') } </th>
              <th colSpan='2'> { this.i18n('users.actions') } </th>
            </tr>
          </thead>
          <tbody>
            { users.map(this.renderUser) }
          </tbody>
        </table>
        <p className='text-center'>
          <button
            className='add--button'
            onClick={ ::this.handleAdd }>
            { this.i18n('users.add') }
          </button>
        </p>
      </div>
    );
  }

}

export default Users;
