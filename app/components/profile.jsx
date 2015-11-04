import capitalize from 'lodash/string/capitalize';
import defer from 'lodash/function/defer';

import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';
import { IntlMixin } from 'react-intl';

@connect(({ users }) => ({ ...users }))
class Profile extends Component {

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  }

  static propTypes = {
    params: PropTypes.object.isRequired,
    users: PropTypes.array
  }

  i18n = IntlMixin.getIntlMessage
  formatMessage = IntlMixin.formatMessage.bind({ ...this, ...IntlMixin })

  componentWillMount() {
    const { flux } = this.context;
    const { params: { seed } } = this.props;

    this.updatePageTitle();
    flux.getActions('users').fetchBySeed(seed);
  }

  componentWillReceiveProps({ users, params: { seed } }) {
    if ((users.length !== this.props.users.length) ||
        (seed !== this.props.params.seed)) {
      defer(() => this.updatePageTitle());
    }
  }

  getUser() {
    const { users, params: { seed } } = this.props;
    return users.find(u => u.seed === seed);
  }

  updatePageTitle() {
    const { flux } = this.context;
    const user = this.getUser();

    let title;
    if (user) {
      const { user: { name: { first, last } } } = user;
      const fullName = `${capitalize(first)} ${capitalize(last)}`;

      title = this.i18n('profile.page-title');
      title = this.formatMessage(title, { fullName });
    } else {
      title = this.i18n('profile.not-found-page-title');
    }

    flux.getActions('title').set(title);
  }

  render() {
    const user = this.getUser();

    if (user) {
      const { user: { name: { first, last }, picture } } = user;

      return (
        <div className='app--profile text-center'>
          <h2>{ capitalize(first) } { capitalize(last) }</h2>
          <img
            src={ picture.medium }
            alt='profile picture' />
        </div>
      );
    }

    return (<h2>User not found</h2>);
  }

}

export default Profile;
