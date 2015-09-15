import React, { Component } from 'react';

export default function requireAuth(ChildComponent) {
  class Authenticated extends Component {

    static onEnter(next, redirect) {
      // Assume user is never authenticated
      // TODO: link with some API for better example
      const isAuthenticated = false;
      if (!isAuthenticated) return redirect({}, '/login-info');
    }

    render() {
      return <ChildComponent {...this.props} {...this.state} />;
    }
  }

  return Authenticated;
}
