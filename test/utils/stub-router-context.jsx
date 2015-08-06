import objectAssign from 'react/lib/Object.assign';
import React, {PropTypes} from 'react';

export default function stubRouterContext(Component, props, stubs) {
  const RouterStub = objectAssign({
    makePath() {},
    makeHref() {},
    transitionTo() {},
    replaceWith() {},
    goBack() {},
    getCurrentPath() {},
    getCurrentRoutes() {},
    getCurrentPathname() {},
    getCurrentParams() {},
    getCurrentQuery() {},
    isActive() {},
    getRouteAtDepth() {},
    setRouteComponentAtDepth() {}
  }, stubs);

  return React.createClass({
    displayName: 'RouterStub',
    childContextTypes: {
      router: PropTypes.object.isRequired,
      routeDepth: PropTypes.number.isRequired
    },
    getChildContext() {
      return {
        router: RouterStub,
        routeDepth: 0
      };
    },
    render() {
      const customProps = Object.assign({}, this.props, props);
      return <Component {...customProps} />;
    }
  });
};
