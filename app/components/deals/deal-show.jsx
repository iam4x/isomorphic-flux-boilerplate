import React, { Component, PropTypes } from 'react';
import Radium from 'utils/radium';

@Radium
class DealShow extends Component {

  static propTypes = {
    model: PropTypes.object.isRequired,
    miniatureWidth: PropTypes.string.isRequired,
    miniatureHeight: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
  }

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  }

  defaultState = {
    expandReady: false,
    expandRemoved: false,
    expandClose: false
  }

  state = this.defaultState

  resetState() {
    this.setState(this.defaultState);
  }

  close() {
    this.setState({ expandClose: true });
    console.log('fuuuuuuuu');
    this.props.onClose();
    const el = this.refs.root;
    el ? el.addEventListener('transitionend', ::this.resetState) : null;
  }

  componentDidMount() {
    setTimeout(() => this.setState({ expandReady: true }), 0);
  }

  render() {
    const { model } = this.props;
    const styles = this.getStyles();

    return (
      <section
        ref='root'
        onClick={ ::this.close }
        style={ [
          styles.root,
          this.state.expandReady && styles.root.expanded,
          this.state.expandClose && styles.root.closed,
          this.state.expandRemoved && { display: 'none' }
        ] } >
        <div style={ styles.root.flexContainer }>

          <div style={ [ styles.pic, styles.flexItem ] } >
            <div style={ styles.title } >{ model.email }</div>
            <div style={ styles.subtitle } >Some fish text is very impartant for this work now. Please, try it again and again.</div>
          </div>

          <div style={ [ styles.field, styles.flexItem ] } >
            <div style={ [
              styles.additionText,
              styles.additionText.hidden
            ] } >
              Some fish text is very impartant for this work now. Please, try it again and again.
            </div>
            <button style={ styles.btn }>Buy</button>
          </div>
        </div>
      </section>
    );
  }

  getStyles() {
    const { innerHeight = 480 } = process.env.BROWSER ? window : {};
    const picBackgroundUrl = 'url(http://lorempixel.com/400/400/cats)';
    const rootEl = this.refs.root;
    const { miniatureWidth, miniatureHeight } = this.props;

    return {
      root: {
        position: 'absolute',
        overflow: 'hidden',
        width: miniatureWidth,
        minHeight: miniatureHeight,
        zIndex: 2,
        transform: `translateY(-${innerHeight}px) scale(0)`,
        transition: [
          'height .4s ease .4s',
          'all .4s ease'
        ],
        expanded: {
          width: '100%',
          maxHeight: innerHeight,
          height: rootEl ? rootEl.innerHeight : innerHeight,
          marginLeft: rootEl ? -rootEl.offsetLeft : null,
          transform: `translateY(-${innerHeight}px) scale(1)`
        },
        closed: {
          maxHeight: 0,
          width: '25%'
        }
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
        minHeight: innerHeight - miniatureHeight
      },
      additionText: {
        fontSize: 20
      }
    };
  }
}

export default DealShow;
