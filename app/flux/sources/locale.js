import intlLoader from 'utils/intl-loader';
import LocaleActions from 'flux/actions/locale';

const LocaleSource = {

  initialize: {
    remote(state: Object, locale: string) {
      return new Promise(async (resolve: Function) => {
        if (process.env.BROWSER) {
          const {messages} = await intlLoader(locale);
          return resolve({locale, messages});
        }
        else {
          const {messages} = require(`data/${locale}`);
          return resolve({locale, messages});
        }
      });
    },
    success: LocaleActions.switchLocale
  }

};

export default LocaleSource;
