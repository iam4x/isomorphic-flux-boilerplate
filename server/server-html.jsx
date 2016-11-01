import React from 'react'

type Props = {
  body: string,
  assets: Object,
  locale: string,
  title: string,
  description: string
};

function serviceWorkerScript() {
  return '(function(){if("serviceWorker" in navigator){navigator.serviceWorker.register("/assets/serviceWorker.js");}})()';
}

function ServerHTML(props: Props) {
  const { body, assets, locale, title, description, isProd } = props

  return (
    <html lang={ locale }>
      <head>
        <meta charSet='utf-8' />

        {/* Styles */}
        <link rel='icon' type='image/ico' href='/favicon.ico' />
        { assets.style.map((href, idx) =>
          <link key={ idx } rel='stylesheet' href={ href } />) }

        {/* SEO */}
        <title>{ title }</title>
        <meta name='description' content={ description } />
      </head>
      <body>
        <div id='content' dangerouslySetInnerHTML={ { __html: body } } />
        <script src={ assets.script[0] } />
        <script async={ true } defer={ true } id='github-bjs' src='https://buttons.github.io/buttons.js' />
        { isProd ? <script dangerouslySetInnerHTML={ { __html: serviceWorkerScript() } }></script> : '' }
      </body>
    </html>
  )
}

export default ServerHTML
