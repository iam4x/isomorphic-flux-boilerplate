import React, {Component} from 'react';

const requireAuth = (ChildComponent) => {
  class Authenticated extends Component {

    static willTransitionTo(transition) {
      const nextPath = transition.path;

      // assume user is never authenticated
      // TODO: link with some API for better example
      const isAuthenticated = false;
      if (!isAuthenticated) {
        return transition.redirect('login-info', {}, {nextPath});
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return Authenticated;
};

export default requireAuth;
