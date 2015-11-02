import radium from 'radium';
import Prefixer from 'inline-style-prefixer';
import matchMediaMock from 'match-media-mock';

const _matchMedia = matchMediaMock.create();

function autoPrefixPlugin({ style, getComponentField }) {
  let { prefixer } = getComponentField('context');

  if (!prefixer) {
    /*
     * This is messy but prevents us from having to define the contextType
     * in each component.
     */
    prefixer = getComponentField('_reactInternalInstance')._context.prefixer;

    if (!prefixer) {
      prefixer = new Prefixer();
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
  const matchMedia = () => {
    return !process.env.BROWSER ? _matchMedia : null;
  }();
  return radium({ plugins, matchMedia })(component);
}

export function setClientResolution(width, height) {
  if (!width || !height) return;
  _matchMedia.setConfig({ type: 'screen', width, height });
}

export default ConfiguredRadium;
