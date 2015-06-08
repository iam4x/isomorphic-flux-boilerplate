'use strict';

import React from 'react';

const requireAuth = (Component) => {
  class Authenticated extends React.Component {
    render() {
      return <Component {...this.props}/>;
    }
  }

  Authenticated.willTransitionTo = function (transition) {
    const nextPath = transition.path;
    const isAuthenticated = false;  // assume user is unAuthenticated
    if (!isAuthenticated) {
      transition.redirect('login-info', {}, {'nextPath': nextPath});
    }
  };

  return Authenticated;
};

export default requireAuth;
