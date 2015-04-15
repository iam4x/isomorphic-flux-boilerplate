'use strict';

import objectAssign from 'react/lib/Object.assign';
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
    isActive () {},
    getRouteAtDepth() {},
    setRouteComponentAtDepth() {}
  }, stubs);

  return React.createClass({
    displayName: 'RouterStub',
    childContextTypes: {
      router: React.PropTypes.func,
      routeDepth: React.PropTypes.number.isRequired
    },
    getChildContext() {
      return {
        router: RouterStub,
        routeDepth: 0
      };
    },
    render() {
      return <Component {...props} />;
    }
  });
};
