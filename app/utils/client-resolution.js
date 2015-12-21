import { setClientResolution } from 'utils/radium';

const getCookie = (cookie, cname) => {
  var name = cname + "=";
  var ca = cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }
  return '';
};

export default () =>
  function* (next) {
    const cookies = this.request.header.cookie || '';
    const width = getCookie(cookies, 'width');
    const height = getCookie(cookies, 'height');
    setClientResolution(width, height);
    yield next;
  };
