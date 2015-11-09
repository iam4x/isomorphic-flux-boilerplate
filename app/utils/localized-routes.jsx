import React from 'react';
import { Route } from 'react-router';

// Return an array of different routes paths for a same component
// used to generate localized routes in `/app/routes.js`
export function generateRoute({ paths, component }) {
  return paths.map(function(path) { /* eslint react/display-name: 0 */
    const customProps = { key: path, path, component };
    // Static `onEnter` is defined on
    // component, we should pass it to route props
    if (component.onEnter) customProps.onEnter = component.onEnter;
    return <Route { ...customProps } />;
  });
}

// Replace params in route format: `/profile/:seed`
//
// Params:
//  - route: string = route with `:` preceding params
//  - params: object = key are param names
//
// Example:
//  For route: `/route/:foo` params will be `{foo: 'bar'}`
export function replaceParams(route, params) {
  let parsedRoute = route.trim();
  Object.keys(params).forEach(function(paramKey) {
    const param = ':' + paramKey;
    const paramValue = params[paramKey];
    if (parsedRoute && parsedRoute.match(param)) {
      parsedRoute = parsedRoute.replace(param, paramValue);
    }
  });
  return parsedRoute;
}
