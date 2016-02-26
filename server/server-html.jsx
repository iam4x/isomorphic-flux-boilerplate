import React from 'react';

const conditional = `<!--[if IE 8]>
  <script src='//cdnjs.cloudflare.com/ajax/libs/es5-shim/4.1.1/es5-shim.min.js'></script>
  <script src='//cdnjs.cloudflare.com/ajax/libs/es5-shim/4.1.1/es5-sham.min.js'></script>
  <script src='//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js'></script>
  <script src='//cdn.uriit.ru/console-polyfill/index.js'></script>
<![endif]-->`;

type Props = {
  body: string,
  assets: Object,
  locale: string,
  title: string,
  description: string
};

function ServerHTML(props: Props) {
  const { body, assets, locale, title, description } = props;

  return (
    <html lang={ locale }>
      <head>
        <meta
          name='description'
          content={ description } />
        <meta
          name='react-conditional-hack'
          dangerouslySetInnerHTML={ { __html: conditional } } />
        <meta charSet='utf-8' />
        <link rel='icon' type='image/ico' href='/favicon.ico' />
        { assets.style.map((href, idx) =>
          <link key={ idx } rel='stylesheet' href={ href } />) }
        <title>{ title }</title>
      </head>
      <body>
        <div id='content' dangerouslySetInnerHTML={ { __html: body } } />
        <script src={ assets.script[0] } />
        <script async defer id='github-bjs' src='https://buttons.github.io/buttons.js' />
      </body>
    </html>
  );
}

export default ServerHTML;
