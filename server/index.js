'use strict';

// Tell `require` calls to look into `/app` also
// it will avoid `../../../../../` require strings
process.env.NODE_PATH = 'app';
require('module').Module._initPaths();

// Install `babel` hook for ES6
require('babel/register');

// Load Intl polyfill
require('utils/intl-polyfill')(require('./config/init').locales);

// Start the server
require('./koa.js');
