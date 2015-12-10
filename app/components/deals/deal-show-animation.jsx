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
    active: false,
    started: false
  }

  showPage() {
    this.setState({ active: true });
    setTimeout( () => this.setState({ started: true }) );
  }

  closePage() {
    this.setState({ active: false, started: false });
  }

  render() {
    const { active, started } = this.state;
    const { page, expander } = this.getStyles();

    return (
      <div ref='elRoot' >
        <DealsListChild
          model={ this.props.model }
          active={ active }
          onSelect={ ::this.showPage } />

        <div style={ [ expander, started && expander['&:active'] ] } >
        { active &&
          <div style={ [ page, started && page['&:started'] ] } >
            <DealShow
              model={ this.props.model }
              onClose={ ::this.closePage } />
          </div> }
        </div>
      </div>
    );
  }

  getStyles() {
    const { elRoot } = this.refs;
    return {
      page: {
        position: 'absolute',
        transition: 'all .5s',
        zIndex: 3,
        minWidth: 0,
        maxWidth: 0,
        '&:started': {
          minWidth: '100%',
          maxWidth: '100%',
          transform: elRoot ?
            `translateX(-${elRoot.offsetLeft}px)
            translateY(-${elRoot.clientHeight}px)` : 0
        }
      },

      expander: {
        minHeight: 0,
        transition: 'all .5s ease-in-out',
        '&:active': {
          minHeight: this.state.active ? 600 : 0
        }
      }
    };
  }
}

export default DealShowAnimation;
