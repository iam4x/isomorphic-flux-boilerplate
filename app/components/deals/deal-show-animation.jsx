import React, { Component, PropTypes } from 'react';
import Radium from 'utils/radium';

import DealsListChild from 'components/deals/deals-list-child';
import DealShow from 'components/deals/deal-show';

@Radium
class DealShowAnimation extends Component {

  static propTypes = {
    model: PropTypes.object.isRequired
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
    const { elRoot } = this.refs;
    return {
      root: {
      },
      showPagePlacer: {
        position: 'absolute',
        transition: 'all .5s',
        zIndex: 3,
        top: elRoot ? elRoot.offsetTop : 0,
        left: 0
      },
      expander: {
        minHeight: this.state.active ? 600 : 0
      }
    };
  }
}

export default DealShowAnimation;
