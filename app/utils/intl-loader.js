import debug from 'debug';

// We need to define `ReactIntl` on the global scope
// in order to load specific locale data from `ReactIntl`
// see: https://github.com/iam4x/isomorphic-flux-boilerplate/issues/64
if (process.env.BROWSER) window.ReactIntl = require('react-intl');

const loaders = {
  en(callback: Function, force = false) {
    if (!window.Intl || force) {
      require.ensure([
        'intl/Intl',
        'intl/locale-data/jsonp/en.js',
        'data/en'
      ], (require) => {
        require('intl/Intl');
        require('intl/locale-data/jsonp/en.js');
        const lang = require('data/en');
        return callback(lang);
      });
    }
    else {
      require.ensure([
        'react-intl/dist/locale-data/en.js',
        'data/en'
      ], (require) => {
        require('react-intl/dist/locale-data/en.js');
        const lang = require('data/en');
        return callback(lang);
      });
    }
  },
  fr(callback: Function, force = false) {
    if (!window.Intl || force) {
      require.ensure([
        'intl/Intl',
        'intl/locale-data/jsonp/fr.js',
        'data/fr'
      ], (require) => {
        require('intl/Intl');
        require('intl/locale-data/jsonp/fr.js');
        const lang = require('data/fr');
        return callback(lang);
      });
    }
    else {
      require.ensure([
        'react-intl/dist/locale-data/fr.js',
        'data/fr'
      ], (require) => {
        require('react-intl/dist/locale-data/fr.js');
        const lang = require('data/fr');
        return callback(lang);
      });
    }
  }
};

export default (locale, force) => {
  debug('dev')(`loading lang ${locale}`);
  const promise: Promise = new Promise((resolve) => loaders[locale](resolve, force));
  return promise;
};
