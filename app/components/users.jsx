import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';
import { Link } from 'react-router';
import { IntlMixin } from 'react-intl';

import { replaceParams } from 'utils/localized-routes';

@connect(({ users: { collection } }) => ({ collection }))
class Users extends Component {

  static propTypes = { collection: PropTypes.array.isRequired }

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  }

  i18n = IntlMixin.getIntlMessage

  componentWillMount() {
    const { flux } = this.context;

    flux.getActions('title').set(this.i18n('users.page-title'));
    flux.getActions('users').index();
  }

  handleRemove(index) {
    const { flux } = this.context;
    flux.getActions('users').remove(index);
  }

  renderUser = (user, index) => {
    const profileRoute = replaceParams(
      this.i18n('routes.profile'),
      { seed: user.seed }
    );

    return (
      <tr className='user--row' key={ index }>
        <td>{ user.email }</td>
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
    const { collection } = this.props;

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
            { collection.map(this.renderUser) }
          </tbody>
        </table>
      </div>
    );
  }

}

export default Users;
