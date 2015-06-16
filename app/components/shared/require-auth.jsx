'use strict';

import React from 'react';

const requireAuth = (Component) => {
  class Authenticated extends React.Component {

    static willTransitionTo(transition) {
      const nextPath = transition.path;

      // assume user is not duthenticated
      const isAuthenticated = false;
      if (!isAuthenticated) {
        return transition.redirect('login-info', {}, {nextPath});
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return Authenticated;
};

export default requireAuth;
