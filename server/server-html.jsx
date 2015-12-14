import React from 'react';
import screenSizeDetector from './helpers/screen-size-detect.js';
import normalize from 'styles/normalize';
import { Style, getPrefixedStyle } from 'utils/radium';

const conditional = `<!--[if IE 8]>
  <script src='//cdnjs.cloudflare.com/ajax/libs/es5-shim/4.1.1/es5-shim.min.js'></script>
  <script src='//cdnjs.cloudflare.com/ajax/libs/es5-shim/4.1.1/es5-sham.min.js'></script>
  <script src='//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js'></script>
  <script src='//cdn.uriit.ru/console-polyfill/index.js'></script>
<![endif]-->`;

const styles = {
  body: {
    background: '#6fa229'
  },
  mediaQueries: {
    '(min-width: 550px)': {
      html: {
        fontSize: '120%',
        minWidth: '100%'
      },
      body: {
        minWidth: '100%'
      }
    }
  }
};

export default function ServerHTML({ body, assets, locale, title, description }) {
  return (
    <html lang={ locale }>
      <head>
        <meta charSet='utf-8' />
        <script dangerouslySetInnerHTML={ { __html: screenSizeDetector } } ></script>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='description'
          content={ description } />
        <meta
          name='react-conditional-hack'
          dangerouslySetInnerHTML={ { __html: conditional } } />
        <link rel='icon' type='image/ico' href='/favicon.ico' />
        { assets.style.map( (href, idx) =>
          <link key={ idx } rel='stylesheet' href={ href } /> ) }
        <title>{ title }</title>
        <Style
          rules={ normalize }
          prefix={ getPrefixedStyle } />
        <Style
          rules={ styles }
          prefix={ getPrefixedStyle } />
      </head>
      <body>
        <div id='content' dangerouslySetInnerHTML={ { __html: body } } />
        <script src={ assets.script[0] } />
      </body>
    </html>
  );
}
