'use strict';

import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {capitalize} from 'lodash';

import UsersActions from 'actions/users';
import UsersStore from 'stores/users';

if (process.env.BROWSER) {
  require('styles/profile.scss');
}

export default React.createClass({
  mixins: [ListenerMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState() {
    const seed = this.context.router.getCurrentParams().seed;
    return UsersStore.getBySeed(seed);
  },
  componentWillMount() {
    const seed = this.context.router.getCurrentParams().seed;
    return UsersActions.fetchBySeed(seed);
  },
  componentDidMount() {
    this.listenTo(UsersStore, () => this.setState(this.getInitialState()));
  },
  render() {
    const user = this.state.user.user;
    return (
      <div className='app--profile'>
        <h2>{`${capitalize(user.name.first)} ${capitalize(user.name.last)}`}</h2>
        <div className='picture'>
          <img src={user.picture.medium} />
        </div>
      </div>
    );
  }
});
