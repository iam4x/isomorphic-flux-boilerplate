import matchMediaMock from 'match-media-mock';

const mockMatchMedia = matchMediaMock.create();
const { BROWSER } = process.env;

let clientWidth = 0;
let clientHeight = 0;

const getWindowInnerWidth = () =>
  BROWSER ? window.innerWidth : clientWidth;

const getWindowInnerHeight = () =>
  BROWSER ? window.innerHeight : clientHeight;

const setClientResolution = (width, height) => {
  clientWidth = ~~width || 480;
  clientHeight = ~~height || 640;

  const matchMediaConfig = {
    type: 'screen',
    width: clientWidth,
    height: clientHeight
  };

  mockMatchMedia.setConfig(matchMediaConfig);
};

const getScreen = () => ({
  width: getWindowInnerWidth(),
  height: getWindowInnerHeight()
});

const matchMedia = BROWSER && window.matchMedia ?
  window.matchMedia : mockMatchMedia;

const getUserAgent = () =>
  BROWSER ? window.navigator.userAgent : 'all';

export { getUserAgent, matchMedia, setClientResolution, getScreen };
