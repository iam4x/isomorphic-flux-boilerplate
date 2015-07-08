import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

if (process.env.BROWSER) {
  require('styles/lang-picker.scss');
}

class LangPicker extends Component {

  static propTypes = {
    activeLocale: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  locales = ['fr', 'en']

  renderLocale = ::this.renderLocale
  renderLocale(locale, index) {
    return (
      <li key={index}>
        <a
          className={classNames({active: locale === this.props.activeLocale})}
          onClick={this.props.onChange.bind(this, locale)}>
          {locale}
        </a>
      </li>
    );
  }

  render() {
    return (
      <ul className='lang--picker un-select'>
        {
          this.locales
            .map(this.renderLocale)
        }
      </ul>
    );
  }
}

export default LangPicker;
