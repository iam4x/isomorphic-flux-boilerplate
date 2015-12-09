import React, { Component, PropTypes } from 'react';
import Radium from 'utils/radium';

import DealsListChild from 'components/deals/deals-list-child';
import DealShow from 'components/deals/deal-show';

@Radium
class DealShowAnimation extends Component {

  static propTypes = {
    model: PropTypes.object.isRequired,
    elContainer: PropTypes.element.isRequired
  }

  state = {
    active: false
  }

  showPage() {
    this.setState({ active: true });
  }

  closePage() {
    this.setState({ active: false });
  }

  render() {
    const { root, showPagePlacer, expander } = this.getStyles();

    return (
      <div ref='elRoot' style={ root } >
        <DealsListChild
          model={ this.props.model }
          active={ this.state.active }
          onSelect={ ::this.showPage } />

        { this.state.active &&
          <div style={ showPagePlacer } >
            <DealShow
              model={ this.props.model }
              onClose={ ::this.closePage } />
          </div> }

        <div ref='dummyExpander' style={ expander } ></div>
      </div>
    );
  }

  getStyles() {
    const { elContainer } = this.props;
    const { elRoot } = this.refs;
    const elRootRect = elRoot ? elRoot.getClientRects()[0] : null;
    const elContainerWidth = elContainer ? elContainer.getClientRects()[0].width : null;
    // const elListChildRect = elListChild ? elRoot.getClientRects()[0] : void 0;
    return {
      root: {
        position: 'relative'
      },
      showPagePlacer: {
        position: 'absolute',
        transition: 'all .5s',
        zIndex: 3,
        top: 0,
        minWidth: elContainerWidth - 22,
        left: elRoot ? -elRootRect.left + 16 : null
      },
      expander: {
        minHeight: this.state.active ? 600 : 0
      }
    };
  }
}

export default DealShowAnimation;
