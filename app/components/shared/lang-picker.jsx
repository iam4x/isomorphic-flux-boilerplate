'use strict';

import React from 'react';
import classNames from 'classnames';

import LocaleActions from 'actions/locale';
import LocaleStore from 'stores/locale';

if (process.env.BROWSER) {
  require('styles/lang-picker.scss');
}

export default React.createClass({
  displayName: 'LangPicker',
  handleClick(locale) {
    LocaleActions.switchLocale(locale);
  },
  renderLocales(locales) {
    const activeLocale = LocaleStore.getLocale();
    return locales.map((locale, index) => {
      const klass = classNames({active: locale === activeLocale});
      return (
        <li key={index}>
          <a
            className={klass}
            onClick={this.handleClick.bind(this, locale)}>
            {locale}
          </a>
        </li>
      );
    });
  },
  render() {
    return (
      <ul className='lang--picker un-select'>
        {this.renderLocales(['en', 'fr'])}
      </ul>
    );
  }
});
