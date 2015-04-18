'use strict';

import React from 'react';
import classNames from 'classnames';
import ListenerMixin from 'alt/mixins/ListenerMixin';

if (process.env.BROWSER) {
  require('styles/lang-picker.scss');
}

export default React.createClass({
  displayName: 'LangPicker',
  mixins: [ListenerMixin],
  propTypes: {
    store: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return {locale: this.props.store.getLocale()};
  },
  componentDidMount() {
    this.listenTo(this.props.store, this.handleStoreChange);
  },
  handleStoreChange() {
    this.setState(this.getInitialState());
  },
  handleClick(locale: string) {
    if (locale !== this.state.locale) {
      this.props.actions.switchLocale(locale);
    }
  },
  renderLocales(locales: Array) {
    return locales.map((locale, index) => {
      const klass: string = classNames({active: locale === this.state.locale});
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
