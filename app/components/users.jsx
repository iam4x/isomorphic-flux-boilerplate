import React, { Component, PropTypes } from 'react';
import radium, { Style } from 'radium';
import connect from 'connect-alt';
import { Link } from 'react-router';
import { textCenter, cyanLink } from 'styles/shared';

import { replaceParams } from 'utils/localized-routes';

const RadiumLink = radium(Link);

@radium
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
        <td style={ textCenter }>
          <RadiumLink
            to={ profileRoute }
            style={ cyanLink } >
            { i18n('users.profile') }
          </RadiumLink>
        </td>
        <td style={ [ textCenter, { padding: 20 } ] }>
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
    const { title, tableRules } = this.getStyles();

    return (
      <div>
        <h1 style={ title }>
          { i18n('users.title') }
        </h1>
        <Style rules={ tableRules } />
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

  getStyles() {
    return {
      title: {
        textAlign: 'center'
      },
      list: {
        margin: '0 auto'
      },
      tableRules: {
        '.app--users': {
          margin: '0 auto'
        },
        '.user--row > td': {
          padding: '.2em .5em!important'
        },
        '.user--remove': {
          border: 0,
          background: 'rgb(156, 227, 244)',
          color: 'rgb(255, 255, 255)'
        },
        '.user--remove:hover': {
          background: 'rgb(156, 240, 255)'
        }
      }
    };
  }

}

export default Users;
