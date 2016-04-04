const loaders = {
  en: async () => {
    if (!window.Intl) {
      await require('promise?global!intl')();
      await require('promise?global!intl/locale-data/jsonp/en.js')();
    }
    return await require('promise?global!data/en')();
  },

  fr: async () => {
    if (!window.Intl) {
      await require('promise?global!intl')();
      await require('promise?global!intl/locale-data/jsonp/fr.js')();
    }
    return await require('promise?global!data/fr');
  }
};

export default async (locale) => {
  const result = await loaders[locale]();

  if (process.env.BROWSER) {
    window.ReactIntl = require('react-intl');
    require(`react-intl/dist/locale-data/${locale}.js`);
  }

  return result;
};
