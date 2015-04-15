'use strict';

import React from 'react';

import LocaleActions from 'actions/locale';

if (process.env.BROWSER) {
  require('styles/lang-picker.scss');
}

export default React.createClass({
  displayName: 'LangPicker',
  handleClick(locale) {
    LocaleActions.switchLocale(locale);
  },
  render() {
    return (
      <ul className='lang--picker'>
        <li>
          <a onClick={this.handleClick.bind(this, 'en')}>
            EN
          </a>
        </li>
        <li>
          <a onClick={this.handleClick.bind(this, 'fr')}>
            FR
          </a>
        </li>
      </ul>
    );
  }
});
