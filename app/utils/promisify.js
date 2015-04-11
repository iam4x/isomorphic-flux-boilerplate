'use strict';

export default (fn) => new Promise((resolve) => fn((result) => resolve(result)));
