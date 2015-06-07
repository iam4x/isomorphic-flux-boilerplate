'use strict';

import React from 'react';
import classNames from 'classnames';
import ListenerMixin from 'alt/mixins/ListenerMixin';

if (process.env.BROWSER) {
  require('styles/lang-picker.scss');
}

export default class LangPicker extends React.Component {
  static propTypes = {
    store: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  }

  constructor(props: ?Object = {}) {
    super(props);

    const locale: string = props.store.getLocale();
    this.state = {locale};
  }

  componentDidMount() {
    this.props.store.listen(this._handleStoreChange);
  }

  componentWillUnmount() {
    this.props.store.unlisten(this._handleStoreChange);
  }

  _handleStoreChange = this._handleStoreChange.bind(this)
  _handleStoreChange() {
    const locale: string = this.props.store.getLocale();
    return this.setState({locale});
  }

  _handleClick(locale: string) {
    if (locale !== this.state.locale) {
      this.props.actions.switchLocale(locale);
    }
  }

  renderLocales(locales: Array = []) {
    return locales.map((locale, index) => {
      const klass: string = classNames({active: locale === this.state.locale});
      return (
        <li key={index}>
          <a
            className={klass}
            onClick={this._handleClick.bind(this, locale)}>
            {locale}
          </a>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className='lang--picker un-select'>
        {this.renderLocales(['en', 'fr'])}
      </ul>
    );
  }
}
