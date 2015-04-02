'use strict';

import objectAssign from 'object-assign';

import services from './services';

export default (params, callback) => {
  const toResolve = [];
  // Find which services we need to resolve
  // before rendering
  params.routes.forEach((route) => {
    if (typeof services[route.name] === 'function') {
      toResolve.push(new Promise(services[route.name]));
    }
  });
  Promise
    .all(toResolve)
    .then((results) => {
      let nextState = {};
      results.forEach((result) => nextState = objectAssign(nextState, result));
      return callback(JSON.stringify(nextState));
    });
};
