import radium, { Style } from 'radium';
import Prefixer from 'inline-style-prefixer';
import matchMediaMock from 'match-media-mock';

const matchMedia = matchMediaMock.create();
const customUserAgent = 'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53';

global.navigator = { userAgent: customUserAgent };

const ConfiguredRadium = component => {
  function autoPrefixPlugin({ style, getComponentField }) {
    let { prefixer } = getComponentField('context');
    const instancePrefixer = getComponentField('_reactInternalInstance')._context.prefixer;
    !prefixer ?
      prefixer = instancePrefixer ||
      new Prefixer(customUserAgent) :
      false;
    return { style: prefixer.prefix(style) };
  }

  const plugins = [
    radium.Plugins.mergeStyleArray,
    radium.Plugins.checkProps,
    radium.Plugins.resolveMediaQueries,
    radium.Plugins.resolveInteractionStyles,
    autoPrefixPlugin,
    radium.Plugins.checkProps
  ];

  return process.env.BROWSER ?
    radium({ plugins })(component) :
    radium({ plugins, matchMedia, userAgent: customUserAgent })(component);
};

const setClientResolution = (width = 640, height = 480) => {
  matchMedia.setConfig({ type: 'screen', width, height });
};

const getPrefixedStyle = style => {
  const prefixer = (() => {
    const userAgent = process.env.BROWSER ?
      navigator.userAgent : customUserAgent;
    return new Prefixer(userAgent);
  })();

  return prefixer.prefix(style);
};

export { Style, setClientResolution, getPrefixedStyle };
export default ConfiguredRadium;
