'use strict';

import React from 'react';
import classNames from 'classnames';
import ListenerMixin from 'alt/mixins/ListenerMixin';

import LocaleActions from 'actions/locale';
import LocaleStore from 'stores/locale';

if (process.env.BROWSER) {
  require('styles/lang-picker.scss');
}

export default React.createClass({
  displayName: 'LangPicker',
  mixins: [ListenerMixin],
  getInitialState() {
    return {locale: LocaleStore.getLocale()};
  },
  componentDidMount() {
    this.listenTo(LocaleStore, this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.getInitialState());
  },
  handleClick(locale) {
    if (locale !== this.state.locale) {
      LocaleActions.switchLocale(locale);
    }
  },
  renderLocales(locales) {
    return locales.map((locale, index) => {
      const klass = classNames({active: locale === this.state.locale});
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
