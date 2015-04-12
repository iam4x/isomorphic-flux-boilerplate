'use strict';

// Browser ES6 Polyfill
require('babel/polyfill');

var context = require.context('./test/spec', true, /\.test\.jsx$/);
context.keys().forEach(context);
