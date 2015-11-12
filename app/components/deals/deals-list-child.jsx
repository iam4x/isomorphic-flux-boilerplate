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
    expandStart: false,
    expandPositioned: false,
    expandClose: false
  }

  state = this.defaultState

  resetState() {
    this.setState(this.defaultState);
  }

  expand() {
    console.log('expand');
    this.setState({ expandStart: true });
    setTimeout(() => this.setState({ expandPositioned: true }), 0);
  }

  close() {
    this.setState({ expandClose: true });
    console.log('clise');
  }

  render() {
    const { model } = this.props;
    const styles = this.getStyles();
    return (
      <div
        style={ styles.root }
        onClick={ ::this.expand } >

        <section style={ styles.wrap } >
          <div
            style={ [
              styles.miniature,
              this.state.expandPositioned || this.state.expandClose && styles.miniature.expanded
            ] } >
            <div style={ styles.miniature.title } >{ model.email }</div>
            <div style={ styles.miniature.text } >Some fish text is very impartant for this work now. Please, try it again and again.</div>
            <button style={ styles.btn }>Buy</button>
          </div>
        </section>

        { this.state.expandPositioned &&
          <DealShow
            model={ model }
            onClose={ ::this.close }
            miniatureWidth= '25%'
            miniatureHeight='160' />
        }
      </div>
    );
  }

  getStyles() {
    const { innerHeight = 480 } = process.env.BROWSER ? window : {};
    const height = 160;
    const picBackgroundUrl = 'url(http://lorempixel.com/400/400/cats)';

    return {
      root: {
        flex: '1 1 33%',
        margin: '0 auto',
        '@media all and (min-width: 410px)': {
          maxWidth: '50%'
        },
        '@media all and (min-width: 620px)': {
          maxWidth: '33%'
        },
        '@media all and (min-width: 830px)': {
          maxWidth: '25%'
        }
      },
      wrap: {
        position: 'relative'
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
      },

      miniature: {
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
        expanded: {
          opacity: 0,
          marginBottom: innerHeight - height,
          backgroundImage: 'none'
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
          background: 'rgba(255, 255, 255, .5)',
          expanded: {
            fontSize: 48,
            width: '70%',
            padding: '2%',
            margin: '5% auto'
          }
        }
      }
    };
  }
}

export default DealsListChild;
