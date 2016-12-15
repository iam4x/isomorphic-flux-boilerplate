/* eslint import/no-webpack-loader-syntax: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
/* eslint import/no-unresolved: 0 */

const loaders = {
  en: async () => {
    if (!window.Intl) {
      await require('promise?global!intl')()
      await require('promise?global!intl/locale-data/jsonp/en.js')()
    }
    return await require('promise?global!data/en')()
  },

  fr: async () => {
    if (!window.Intl) {
      await require('promise?global!intl')()
      await require('promise?global!intl/locale-data/jsonp/fr.js')()
    }
    return await require('promise?global!data/fr')()
  }
}

export default async (locale) => {
  if (process.env.NODE_ENV === 'test') return { messages: {} }

  const result = await loaders[locale]()
  if (process.env.BROWSER) {
    window.ReactIntl = require('react-intl')
    const { addLocaleData } = require('react-intl')
    addLocaleData(require(`react-intl/locale-data/${locale}.js`))
  }

  return result
}
