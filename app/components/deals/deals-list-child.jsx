import React, { Component, PropTypes } from 'react';
import Radium from 'utils/radium';
import DealShow from 'components/deals/deal-show';

@Radium
class DealsListChild extends Component {

  static propTypes = {
    model: PropTypes.object.isRequired
  }

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  }

  defaultState = {
    started: false,
    expanded: false,
    closed: false
  }

  state = this.defaultState

  resetState() {
    this.setState(this.defaultState);
    this.setState({ closed: true });
  }

  handleExpand() {
    this.setState({ started: true });
    setTimeout(() => this.setState({ expanded: true }), 0);
  }

  render() {
    const { model } = this.props;
    const styles = this.getStyles();
    return (
      <div>
        <section style={ styles.wrap } >
          <section
            style={ [
              styles.base,
              this.state.started && styles.base_expanded,
              this.state.closed && styles.base_closed
            ] } >
            <div style={ styles.title } >{ model.email }</div>
            <div style={ [
              styles.text,
              this.state.expanded && styles.text_expanded
            ] } >
              Some fish text is very impartant for this work now. Please, try it again and again.
            </div>
            <button
              style={ styles.btn }
              onClick={ ::this.handleExpand } >
              More
            </button>
          </section>
        </section>

        { (this.state.expanded || this.state.closed) &&
          <DealShow
            model={ model }
            onClose={ ::this.resetState }
            initWidth= '20%'
            initHeight='160' />
        }
      </div>
    );
  }

  getStyles() {
    const { innerHeight = 480 } = process.env.BROWSER ? window : {};
    const height = 160;
    const picBackgroundUrl = 'url(http://lorempixel.com/400/400/cats)';

    return {
      wrap: {
        position: 'relative'
      },
      base: {
        height: height,
        boxSizing: 'border-box',
        border: '1px solid #fff',
        backgroundImage: picBackgroundUrl,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 1,
        transition: [
          'opacity .2s ease-out',
          'margin-bottom .4s ease-out'
        ],
        opacity: 1,
        marginBottom: 0
      },

      base_expanded: {
        opacity: 0,
        marginBottom: innerHeight - height
      },

      base_closed: {
        opacity: 1,
        marginBottom: 0
      },

      title: {
        background: 'rgba(0, 0, 100, .5)',
        padding: 10,
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
      },

      text: {
        fontSize: 16,
        margin: 12,
        padding: 6,
        textAlign: 'center',
        background: 'rgba(255, 255, 255, .5)'
      },

      text_expanded: {
        fontSize: 48,
        width: '70%',
        padding: '2%',
        margin: '5% auto'
      },

      btn: {
        background: 'rgb(13, 113, 198)',
        padding: '4% 5%',
        border: 0,
        color: 'rgb(255, 255, 255)',
        fontSize: 24,
        position: 'absolute',
        right: 12,
        bottom: 4
      }
    };
  }
}

export default DealsListChild;
