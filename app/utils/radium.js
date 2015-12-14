import radium, { Style } from 'radium';
import Prefixer from 'inline-style-prefixer';
import matchMediaMock from 'match-media-mock';

const matchMedia = matchMediaMock.create();
const customUserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.80 Safari/537.36';

!process.env.BROWSER ?
  global.navigator = { userAgent: customUserAgent } : null;

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

  function resolveStatesStyles({ style }) {
    if (style.length <= 0) return style;

    const isStateStyleField = name => {
      const states = [ '&:active', '&:started', '&:disabled', '&:closed', '&:activated' ];
      return states.indexOf(name) > -1;
    };

    const output = Object.keys(style).reduce(
      (styleWithoutStates, name) => {
        if (!isStateStyleField(name)) {
          styleWithoutStates[name] = style[name];
        }
        return styleWithoutStates;
      }, {} );

    return { style: output };
  }

  const plugins = [
    radium.Plugins.mergeStyleArray,
    radium.Plugins.checkProps,
    radium.Plugins.resolveMediaQueries,
    radium.Plugins.resolveInteractionStyles,
    resolveStatesStyles,
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
  const prefixer = void () => {
    const userAgent = process.env.BROWSER ?
      navigator.userAgent : customUserAgent;
    return new Prefixer(userAgent);
  };

  return prefixer.prefix(style);
};

export { Style, setClientResolution, getPrefixedStyle };
export default ConfiguredRadium;
