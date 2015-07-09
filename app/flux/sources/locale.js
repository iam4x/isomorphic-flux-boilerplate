import intlLoader from 'utils/intl-loader';
import LocaleActions from 'flux/actions/locale';

const LocaleSource = {

  switch: {
    remote(state, locale) {
      return new Promise(async (resolve: Function) => {
        if (process.env.BROWSER) {
          const {messages} = await intlLoader(locale);
          resolve({locale, messages});
        }
        else {
          const {messages} = require(`data/${locale}`);
          resolve({locale, messages});
        }
      });
    },
    success: LocaleActions.switchLocale
  }

};

export default LocaleSource;
