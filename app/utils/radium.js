import radium from 'radium';
import Prefixer from 'inline-style-prefixer';
import matchMediaMock from 'match-media-mock';

const matchMedia = matchMediaMock.create();
matchMedia.setConfig({ type: 'screen', width: 1200, height: 800 });

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
  return radium({ plugins, matchMedia })(component);
}

export default ConfiguredRadium;
