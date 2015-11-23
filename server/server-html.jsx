import React from 'react';

const conditional = `<!--[if IE 8]>
  <script src='//cdnjs.cloudflare.com/ajax/libs/es5-shim/4.1.1/es5-shim.min.js'></script>
  <script src='//cdnjs.cloudflare.com/ajax/libs/es5-shim/4.1.1/es5-sham.min.js'></script>
  <script src='//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js'></script>
  <script src='//cdn.uriit.ru/console-polyfill/index.js'></script>
<![endif]-->`;

const funcToStringWithCall = (fn) => {
  return `(${ fn.toString() }).call();`
}

const screenSizeFnSrc = () => {
  try {
    var docCookies = {
      setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
          switch (vEnd.constructor) {
            case Number:
              sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
              break;
          }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
      },
      hasItem: function (sKey) {
        if (!sKey) { return false; }
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
      }
    };

    var updateProps = function() {
      docCookies.setItem('width', window.innerWidth, 86400);
      docCookies.setItem('height', window.innerHeight, 86400);
    }

    window.addEventListener('resize', updateProps, true);
    updateProps();

    if (!sessionStorage.getItem('documentWidth')) {
      sessionStorage.setItem('documentWidth', window.innerWidth);
      window.location.reload();
    };
  }
  catch (err) {
    console ? console.error(err) : null;
  }
}

export default function ServerHTML({ body, assets, locale, title }) {
  return (
    <html lang={ locale }>
      <head>
        <script dangerouslySetInnerHTML={ { __html: funcToStringWithCall(screenSizeFnSrc) } } />
        <meta
          name='react-conditional-hack'
          dangerouslySetInnerHTML={ { __html: conditional } } />
        <meta charSet='utf-8' />
        <link rel='icon' type='image/ico' href='/favicon.ico' />
        { assets.style.map( (href, idx) =>
          <link key={ idx } rel='stylesheet' href={ href } /> ) }
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
