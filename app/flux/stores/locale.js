import debug from 'debug';

class LocaleStore {

  constructor() {
    this.bindActions(this.alt.getActions('locale'));
    this.locales = [];
    this.messages = {};
    this.formats = {};
  }

  onSwitchLocale({ messages, locale }) {
    // Save locale into a cookie
    // that will be read from server on requests
    if (process.env.BROWSER) {
      const Cookies = require('cookies-js');
      Cookies.set('_lang', locale, { expires: Infinity });
      debug('dev')(`updated _lang cookie to ${locale}`);
    }

    this.messages = messages;
    this.locales = [ locale ];
  }

}

export default LocaleStore;
