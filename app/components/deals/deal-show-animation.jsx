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
    started: false,
    closed: false
  }

  showPage() {
    this.setState({ active: true, closed: false });
    setTimeout( () => this.setState({ started: true }) );
  }

  closePage() {
    this.setState({ active: false, started: false, closed: true });
  }

  render() {
    const { active, started, closed } = this.state;
    const { page, expander, hider } = this.getStyles();

    return (
      <div ref='elRoot' >
        <div style={ [ hider,
            started && !closed && hider['&:active'] ] } >
          <DealsListChild
            model={ this.props.model }
            active={ active }
            onSelect={ ::this.showPage } />
        </div>

        <div style={ [ expander,
            started && !closed && expander['&:active'] ] } >
          <div style={ [ page,
              started && page['&:started'],
              closed && page['&:closed'] ] } >
            <DealShow
              model={ this.props.model }
              onClose={ ::this.closePage } />
          </div>
        </div>
      </div>
    );
  }

  getRootParam(param) {
    const { elRoot } = this.refs;
    return elRoot && elRoot[param] ? elRoot[param] : 0;
  }

  getStyles() {
    return {
      page: {
        position: 'absolute',
        transition: 'all .6s, min-width .3s, opacity .3s',
        zIndex: 3,
        minWidth: this.getRootParam('clientWidth'),
        maxWidth: this.getRootParam('clientWidth'),
        opacity: 0,
        '&:started': {
          minWidth: '100%',
          maxWidth: '100%',
          opacity: 1,
          transform: `
            translateX(-${this.getRootParam('offsetLeft')}px)
            translateY(-${this.getRootParam('clientHeight')}px)`
        },
        '&:closed': {
          minWidth: 0,
          maxWidth: 0,
          opacity: 0,
          transition: 'all .3s, min-width .6s, opacity .2s',
          transform: 'translateX(0px)'
        }
      },

      expander: {
        minHeight: 0,
        maxHeight: 0,
        overflow: 'hidden',
        transition: 'min-height .6s ease-in-out',
        '&:active': {
          minHeight: this.state.active ? 600 : 0,
          maxHeight: this.state.active ? 600 : 0
        }
      },

      hider: {
        opacity: 1,
        transition: 'all .3s',
        '&:active': {
          opacity: 0
        }
      }
    };
  }
}

export default DealShowAnimation;
