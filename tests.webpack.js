'use strict';

var context = require.context('./test/spec', true, /\.test\.jsx$/);
context.keys().forEach(context);
