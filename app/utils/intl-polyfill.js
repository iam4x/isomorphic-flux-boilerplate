import debug from 'debug';

const hasBuiltInLocaleData = (locale) => {
  return Intl.NumberFormat.supportedLocalesOf(locale)[0] === locale &&
    Intl.DateTimeFormat.supportedLocalesOf(locale)[0] === locale;
};

export default (locales) => {
  if (!process.env.BROWSER) {
    if (global.Intl) {
      if (!locales.every(hasBuiltInLocaleData)) {
        // `Intl` exists, but it doesn't have the data we need, so load the
        // polyfill and replace the constructors with need with the polyfill's.
        const IntlPolyfill = require('intl');
        Intl.NumberFormat = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
      }
    } else {
      // No `Intl`: use and load polyfill
      global.Intl = require('intl');
      debug('koa')('Intl is not supported, so the polyfill has been loaded');
    }
  }
};
