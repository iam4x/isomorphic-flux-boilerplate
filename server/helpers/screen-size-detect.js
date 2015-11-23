const funcToStringWithCall = (fn) => {
  return `(${ fn.toString().replace(/\r?\n|\r|\s{2,}/gm, '') }).call();`
}

export default funcToStringWithCall(function() {
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
    };

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
});
