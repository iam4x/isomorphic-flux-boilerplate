import React, { Component, PropTypes } from 'react';
import Radium from 'utils/radium';

import DealsListChild from 'components/deals/deals-list-child';
import DealShow from 'components/deals/deal-show';

@Radium
class DealShowAnimation extends Component {

  static propTypes = {
    model: PropTypes.object.isRequired
  }

  defaultStates = {
    active: false,
    started: false,
    closed: false,
    removed: true
  }

  state = this.defaultStates

  transitionEndEventOnce(handler) {
    const page = this.refs.page;
    const completeHandler = () => {
      handler();
      page.removeEventListener('transitionend', completeHandler);
    };
    page ? page.addEventListener('transitionend', completeHandler) :
      handler();
  }

  showPage() {
    this.setState({ active: true, closed: false, removed: false });
    setTimeout( () => this.setState({ started: true }) );
  }

  closePage() {
    this.setState({ active: false, started: false, closed: true });
    setTimeout( () => this.setState({ removed: true }) );
  }

  render() {
    const { active, started, closed, removed } = this.state;
    const { page, expander, hider } = this.getStyles();

    return (
      <div ref='elRoot' >
        <div
            ref='listChild'
            style={ [ hider,
            started && hider['&:active'] ] } >
          <DealsListChild
            model={ this.props.model }
            active={ active }
            onSelect={ ::this.showPage } />
        </div>

        <div style={ [ expander,
            active && expander['&:active'],
            closed && expander['&:disabled'] ] } >
          <div
              ref='page'
              className='pageContainer'
              style={ [ page,
                started && page['&:started'],
                closed && page['&:closed'],
                removed && page['&:removed'] ] } >
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
    const { listChild } = this.refs;
    const { active } = this.state;

    return {
      page: {
        display: 'block',
        position: 'absolute',
        zIndex: 3,
        opacity: 0,
        maxWidth: this.getRootParam('clientWidth'),
        transition: 'all .6s, min-width .3s, opacity .3s',
        boxShadow: '0 .5em .5em #f7f7f7',
        background: '#fff',
        '&:started': {
          minWidth: '100%',
          maxWidth: '100%',
          opacity: 1,
          transform: `
            translateX(-${this.getRootParam('offsetLeft')}px)
            translateY(-${listChild && listChild.clientHeight}px)`
        },
        '&:closed': {
          minWidth: 0,
          maxWidth: 0,
          height: 0,
          opacity: 0,
          transition: 'all .3s, min-width .6s, opacity .2s',
          transform: 'translateX(0px)'
        },
        '&:removed': {
          display: 'none'
        }
      },

      expander: {
        minHeight: 0,
        maxHeight: 0,
        overflow: 'hidden',
        transition: 'min-height .6s ease-in-out',
        '&:active': {
          minHeight: active ? '65vh' : 0,
          maxHeight: active ? '65vh' : 0
        },
        '&:disabled': {
          minHeight: 0,
          maxHeight: 0
        }
      },

      hider: {
        opacity: 1,
        transition: 'all .4s',
        '&:active': {
          opacity: 0,
          transform: 'scale(1.1)'
        }
      }
    };
  }
}

export default DealShowAnimation;
