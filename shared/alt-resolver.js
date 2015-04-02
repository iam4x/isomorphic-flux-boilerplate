'use strict';

import _ from 'lodash';
import async from 'async';

import services from './services';

export default (params, callback) => {
  let toResolve = [];
  // Find which services we need to resolve
  // before rendering
  params.routes.forEach((route) => {
    if (typeof services[route.name] === 'function') {
      toResolve.push(services[route.name]);
    }
  });
  // Resolve them, we use `async.map` since they
  // are async functions
  async.map(
    toResolve,
    (service, done) => service(done),
    (err, results) => {
      let nextState = {};
      results.forEach((result) => nextState = _.assign(nextState, result));
      // All services are resolved, let's fire the callback
      return callback(JSON.stringify(nextState));
    }
  );
};
