import radium, { Style } from 'radium';
import Prefixer from 'inline-style-prefixer';
import matchMediaMock from 'match-media-mock';

const matchMedia = matchMediaMock.create();

process.env.BROWSER ? null :
  global.navigator = {
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36'
  };

function getPrefixer() {
  const userAgent = process.env.BROWSER ?
    navigator.userAgent :
    'Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53';
  return new Prefixer(userAgent);
}

function autoPrefixPlugin({ style, getComponentField }) {
  let { prefixer } = getComponentField('context');

  if (!prefixer) {
    /*
     * This is messy but prevents us from having to define the contextType
     * in each component.
     */
    prefixer = getComponentField('_reactInternalInstance')._context.prefixer;

    if (!prefixer) {
      const customUserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36';
      prefixer = new Prefixer(customUserAgent);
    }
  }
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

function ConfiguredRadium(component) {
  return process.env.BROWSER ?
    radium({ plugins })(component) :
    radium({ plugins, matchMedia })(component);
}

export function setClientResolution(width, height) {
  if (!width || !height) return;
  matchMedia.setConfig({ type: 'screen', width, height });
}

export function getPrefixedStyle(style) {
  const prefixer = getPrefixer();
  return prefixer.prefix(style);
}

export { Style };
export default ConfiguredRadium;
