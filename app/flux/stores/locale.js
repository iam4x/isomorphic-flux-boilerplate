import debug from 'debug';
import alt from 'utils/alt';
import LocaleSource from 'flux/sources/locale';
import LocaleActions from 'flux/actions/locale';
import {datasource} from 'alt/utils/decorators';

@datasource(LocaleSource)
class LocaleStore {

  static displayName = 'LocaleStore'

  constructor() {
    this.bindActions(LocaleActions);

    this.locales = [];
    this.messages = {};
  }

  static getLocale() {
    return this.getState().locales[0];
  }

  onSwitchLocale({locale, messages}) {
    // Save locale into a cookie
    // that will be read from server on requests
    if (process.env.BROWSER) {
      const Cookies = require('cookies-js');
      Cookies.set('_lang', locale, {expires: Infinity});

      debug('dev')(`updated _lang cookie to ${locale}`);
    }

    return this.setState({messages, locales: [locale]});
  }

}

export default alt.createStore(LocaleStore);
