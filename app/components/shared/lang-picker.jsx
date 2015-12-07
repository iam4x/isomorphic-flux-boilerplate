import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
class LangPicker extends Component {

  static propTypes = {
    activeLocale: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  locales = ['fr', 'en']

  renderItem = (locale, index) => {
    const { onChange, activeLocale } = this.props;

    return (
      <li key={ index }>
        <a
          style={ [
            this.styles.link,
            activeLocale && this.styles.link_active ] }
          onClick={ () => onChange(locale) } >
          { locale }
        </a>
      </li>
    );
  }

  render() {
    return (
      <ul style={ this.styles.ul }>
        { this.locales.map(this.renderItem) }
      </ul>
    );
  }

  styles = {
    ul: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    link: {
      display: 'inline-block'
    },
    link_active: {
      color: 'black'
    }
  }
}

export default LangPicker;
