import React, { Component, PropTypes } from 'react';
import radium from 'radium';
import { blackColor, whiteColor } from 'styles/shared';

@radium
class LangPicker extends Component {

  static propTypes = {
    activeLocale: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  locales = [ 'fr', 'en' ]

  render() {
    const { onChange, activeLocale } = this.props;
    const { list, listChild, link, linkActive } = this.styles;

    return (
      <ul style={ list }>
        { this.locales.map((locale, index) =>
          <li key={ index } style={ listChild }>
            <a
              style={ [ link, (locale === activeLocale && linkActive) ] }
              onClick={ () => onChange(locale) }>
              { locale }
            </a>
          </li>) }
      </ul>
    );
  }

  styles = {
    list: {
      bottom: -15,
      position: 'absolute',
      right: 9
    },
    listChild: {
      display: 'inline-block',
      marginRight: 10
    },
    link: {
      cursor: 'pointer',
      opacity: '.5',
      padding: '0 5px',
      textTransform: 'uppercase'
    },
    linkActive: {
      backgroundColor: blackColor,
      color: whiteColor,
      opacity: 1
    }
  }
}

export default LangPicker;
