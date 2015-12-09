import React, { Component, PropTypes } from 'react';
import Radium from 'utils/radium';

import DealsListChild from 'components/deals/deals-list-child';
import DealShow from 'components/deals/deal-show';

@Radium
class DealShowAnimation extends Component {
  static propTypes = {
    initWidth: PropTypes.string.isRequired,
    initHeight: PropTypes.string.isRequired,
    model: PropTypes.object.isRequired
  }

  resetState() {
    console.log('reset');
  }

  showPage() {
    console.log('show');
  }

  render() {
    const { root, rootExpanded, listChild, pageShow } = this.getStyles();
    return (
      <div
        ref='root'
        style={ [ root, this.state.expanded && rootExpanded ] } >

        <DealsListChild
          ref='listChild'
          style={ listChild }
          model={ this.props.model }
          onClick={ ::this.showPage } />

        { this.state.expanded &&
          <DealShow
            ref='pageShow'
            style={ pageShow }
            model={ this.props.model }
            onClose={ ::this.resetState } /> }
      </div>
    );
  }

  getStyles() {
    const { initWidth, initHeight } = this.props;
    const { innerHeight = 480 } = process.env.BROWSER ? window : {};

    return {
      root: {
        width: initWidth,
        minHeight: initHeight,
        zIndex: 2,
        transform: `translateY(-${innerHeight}px)`,
        transition: 'all .4s ease'
      },
      rootExpanded: {
        width: '100%',
        minHeight: innerHeight
      },
      listChild: {
        width: initWidth,
        height: initHeight
      },
      pageShow: {
        width: '100%',
        minHeight: innerHeight
      }
    };
  }
}

export default DealShowAnimation;
