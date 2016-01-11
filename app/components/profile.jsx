import capitalize from 'lodash/string/capitalize';
import defer from 'lodash/function/defer';

import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';

@connect(({ users: { collection } }) => ({ collection }))
class Profile extends Component {

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    i18n: PropTypes.func.isRequired
  }

  static propTypes = {
    params: PropTypes.object.isRequired,
    collection: PropTypes.array
  }

  componentWillMount() {
    const { flux } = this.context;
    const { params: { seed } } = this.props;

    this.updatePageTitle();
    flux.getActions('users').show(seed);
  }

  componentWillReceiveProps({ collection, params: { seed } }) {
    if ((collection.length !== this.props.collection.length) ||
        (seed !== this.props.params.seed)) {
      defer(() => this.updatePageTitle());
    }
  }

  getUser() {
    const { collection, params: { seed } } = this.props;
    return collection.find(u => u.seed === seed);
  }

  updatePageTitle() {
    const { flux, i18n } = this.context;
    const user = this.getUser();

    let title;
    if (user) {
      const { name: { first, last } } = user;
      const fullName = `${capitalize(first)} ${capitalize(last)}`;

      title = i18n('profile.page-title', { fullName });
    } else {
      title = i18n('profile.not-found-page-title');
    }

    flux.getActions('helmet').update({ title });
  }

  render() {
    const user = this.getUser();

    if (user) {
      const { name: { first, last }, picture } = user;

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
