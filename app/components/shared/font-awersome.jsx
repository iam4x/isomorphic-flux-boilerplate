/* eslint max-len:0 */
import React, { Component, PropTypes } from 'react';
import radium from 'radium';
import hexCodes from 'data/font-awesome-hexcodes.js';

const { BROWSER } = process.env;

const version = '4.5.0';
const url = 'https://maxcdn.bootstrapcdn.com/font-awesome';

const fontFace = `
  @font-face {
    font-family: 'FontAwesome';
    src: url('${url}/${version}/fonts/fontawesome-webfont.eot?v=${version}');
    src: url('${url}/${version}/fonts/fontawesome-webfont.eot?#iefix&v=${version}') format('embedded-opentype'),
      url('${url}/${version}/fonts/fontawesome-webfont.woff2?v=${version}') format('woff2'),
      url('${url}/${version}/fonts/fontawesome-webfont.woff?v=${version}') format('woff'),
      url('${url}/${version}/fonts/fontawesome-webfont.ttf?v=${version}') format('truetype'),
      url('${url}/${version}/fonts/fontawesome-webfont.svg?v=${version}#fontawesomeregular') format('svg');
    font-weight: normal;
    font-style: normal;
  }
`;

const faStyle = {
  display: 'inline-block',
  fontFamily: 'FontAwesome',
  fontSize: 'inherit',
  fontVariant: 'normal',
  fontWeight: 'normal',
  lineHeight: 1,
  textRendering: 'auto',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale'
};

let fontLoaded = false;

function writeFontFace() {
  // REWRITE TO RADIUM
  if (BROWSER) {
    const styleEl = document.createElement('style');
    styleEl.setAttribute('type', 'text/css');
    styleEl.innerHTML = fontFace;
    document.head.appendChild(styleEl);
  }
}

@radium
class FontAwesome extends Component {
  static propTypes = {
    name: PropTypes.oneOf(Object.keys(hexCodes)).isRequired,
    style: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ])
  };

  componentWillMount() {
    if (!fontLoaded) {
      writeFontFace();
      fontLoaded = true;
    }
  }

  render() {
    const { name, style, ...others } = this.props;
    // Get the hex number from the string, then unicode encode it
    const icon = String.fromCodePoint(parseInt(hexCodes[name], 16));
    return <span style={ [].concat(faStyle, style) } { ...others }>{ icon }</span>;
  }
}

export default FontAwesome;
