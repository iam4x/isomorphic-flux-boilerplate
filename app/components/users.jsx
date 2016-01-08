import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';
import { Link } from 'react-router';

import { replaceParams } from 'utils/localized-routes';

@connect(({ users: { collection } }) => ({ collection }))
class Users extends Component {

  static propTypes = { collection: PropTypes.array.isRequired }

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    i18n: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { flux, i18n } = this.context;

    flux.getActions('helmet').update({ title: i18n('users.page-title') });
    flux.getActions('users').index();
  }

  handleRemove(index) {
    const { flux } = this.context;
    flux.getActions('users').remove(index);
  }

  renderUser = (user, index) => {
    const { i18n } = this.context;
    const profileRoute = replaceParams(
      i18n('routes.profile'),
      { seed: user.seed }
    );

    return (
      <tr className='user--row' key={ index }>
        <td>{ user.email }</td>
        <td className='text-center'>
          <Link to={ profileRoute }>{ i18n('users.profile') }</Link>
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
    const { i18n } = this.context;

    return (
      <div>
        <h1 className='text-center'>
          { i18n('users.title') }
        </h1>
        <table className='app--users'>
          <thead>
            <tr>
              <th> { i18n('users.email') } </th>
              <th colSpan='2'> { i18n('users.actions') } </th>
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
