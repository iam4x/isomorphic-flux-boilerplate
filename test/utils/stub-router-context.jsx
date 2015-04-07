'use strict';

import objectAssign from 'object-assign';
import React from 'react';

export default (Component, props, stubs) => {
  function RouterStub() {}

  objectAssign(RouterStub, {
    makePath () {},
    makeHref () {},
    transitionTo () {},
    replaceWith () {},
    goBack () {},
    getCurrentPath () {},
    getCurrentRoutes () {},
    getCurrentPathname () {},
    getCurrentParams () {},
    getCurrentQuery () {},
    isActive () {}
  }, stubs);

  return React.createClass({
    childContextTypes: {
      routeDepth: React.PropTypes.number.isRequired,
      router: React.PropTypes.func
    },

    getChildContext () {
      return {
        router: RouterStub
      };
    },

    render () {
      return <Component {...props} />;
    }
  });
};
