import React, { Component, PropTypes } from 'react';
import Radium from 'utils/radium';

@Radium
class DealItem extends Component {

  static propTypes = {
    model: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
  }

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  }

  defaultState = {
    expandStart: false,
    expandPositioned: false,
    expandClose: false,
    expandRemoved: false
  }

  state = this.defaultState

  resetState() {
    this.setState(this.defaultState);
  }

  expand() {
    this.setState({ expandStart: true });
    process.env.BROWSER &&
      window.requestAnimationFrame(() => {
        this.setState({ expandPositioned: true });
      });
  }

  close() {
    this.setState({ expandClose: true });
    const el = this.refs.expandedEl;
    el ? el.addEventListener('transitionend', ::this.resetState, true) : null;
  }

  render() {
    const { model } = this.props;
    const styles = this.getStyles();
    return (
      <div
        style={ styles.root }
        onClick={ ::this.expand } >
        <main style={ styles.wrap } >
          <section
            rel='miniature'
            style={ [
              styles.miniature,
              this.state.expandPositioned && styles.miniature.expanded
            ] } >
            <div style={ styles.miniature.title } >{ model.email }</div>
            <div style={ styles.miniature.text } >Some fish text is very impartant for this work now. Please, try it again and again.</div>
            <button style={ styles.btn }>Buy</button>
          </section>
        </main>

        { this.state.expandStart &&
          <section
            ref='expandedEl'
            onClick={ ::this.close }
            style={ [
              styles.full,
              this.state.expandPositioned && styles.full.expanded,
              this.state.expandClose && styles.full.closed,
              this.state.expandRemoved && { display: 'none' }
            ] } >
            <div style={ styles.full.flexContainer }>

              <div style={ [ styles.full.pic, styles.full.flexItem ] } >
                <div style={ styles.full.title } >{ model.email }</div>
                <div style={ styles.full.subtitle } >Some fish text is very impartant for this work now. Please, try it again and again.</div>
              </div>

              <div style={ [ styles.full.field, styles.full.flexItem ] } >
                <div style={ [
                  styles.full.additionText,
                  this.state.expandPositioned && styles.full.additionText.hidden
                ] } >
                  Some fish text is very impartant for this work now. Please, try it again and again.
                </div>
                <button style={ styles.btn }>Buy</button>
              </div>
            </div>
          </section>
        }
      </div>
    );
  }

  getStyles() {
    const { innerHeight = 480 } = process.env.BROWSER ? window : {};
    const { expandedEl } = this.refs;
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
      },

      full: {
        position: 'absolute',
        overflow: 'hidden',
        width: '25%',
        minHeight: height,
        zIndex: 2,
        transform: `translateY(-${innerHeight}px)`,
        transition: [
          'height .4s ease .4s',
          'all .4s ease'
        ],
        expanded: {
          width: '100%',
          maxHeight: innerHeight,
          height: expandedEl ? expandedEl.innerHeight : innerHeight,
          marginLeft: expandedEl ? -expandedEl.offsetLeft : null
        },
        closed: {
          maxHeight: 0,
          width: '25%'
        },

        flexContainer: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch'
        },
        flexItem: {
          flex: '0 0 100%'
        },

        pic: {
          backgroundImage: picBackgroundUrl,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          overflow: 'hidden'
        },
        title: {
          // copy-paste
          background: 'rgba(0, 0, 100, .5)',
          padding: 10,
          fontSize: 18,
          textAlign: 'center',
          color: 'white'
        },
        subtitle: {
          background: 'rgba(255, 255, 255, .5)',
          width: '70%',
          margin: '60px auto',
          fontSize: 32,
          padding: 16
        },
        field: {
          background: 'white',
          width: '100%',
          minHeight: innerHeight - height
        },
        additionText: {
          fontSize: 20
        }
      }
    };
  }
}

export default DealItem;
