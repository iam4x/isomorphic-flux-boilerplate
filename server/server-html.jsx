import React from 'react'

type Props = {
  body: string,
  assets: Object,
  locale: string,
  title: string,
  description: string
};

function serviceWorkerScript() {
  return '(function(){if("serviceWorker" in navigator){navigator.serviceWorker.register("/serviceWorker.js");}})()';
}

function ServerHTML(props: Props) {
  const { body, assets, locale, title, description, isProd } = props

  return (
    <html lang={ locale }>
      <head>
        <meta charSet='utf-8' />

        {/* Styles */}
        <link rel='icon' type='image/ico' href='/favicon.ico' />
        <link rel='manifest' href='/static/manifest.json' />
        { assets.style.map((href, idx) =>
          <link key={ idx } rel='stylesheet' href={ href } />) }

        {/* SEO */}
        <title>{ title }</title>
        <meta name='description' content={ description } />
        { isProd ? <script dangerouslySetInnerHTML={ { __html: serviceWorkerScript() } }></script> : '' }
      </head>
      <body>
        <div id='content' dangerouslySetInnerHTML={ { __html: body } } />
        <script src={ assets.script[0] } />
        <script async defer id='github-bjs' src='https://buttons.github.io/buttons.js' />
      </body>
    </html>
  )
}

export default ServerHTML
