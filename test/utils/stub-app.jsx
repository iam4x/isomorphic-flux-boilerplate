/* eslint react/display-name: 0 */
import React, { Component, PropTypes } from 'react';

export default function stubApp(flux, stubs) {
  const { messages } = require('data/en');

  flux
    .getActions('locale')
    .switchLocaleSuccess({ locale: 'en', messages });

  const i18n = flux.getStore('locale').getState();

  const router = {
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
    setRouteComponentAtDepth() {},
    ...stubs
  };

  return function(DecoratedComponent, props) {
    return class Wrapper extends Component {

      static childContextTypes = {
        flux: PropTypes.object.isRequired,
        messages: PropTypes.object.isRequired,
        locales: PropTypes.array.isRequired,
        router: PropTypes.object.isRequired,
        routeDepth: PropTypes.number.isRequired
      }

      getChildContext() {
        return { flux, router, routeDepth: 0, ...i18n };
      }

      render() {
        const customProps = { ...this.props, ...props };
        return (<DecoratedComponent { ...customProps } />);
      }

    };
  };
}
