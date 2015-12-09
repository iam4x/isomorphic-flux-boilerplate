import React, { Component, PropTypes } from 'react';
import Radium from 'utils/radium';

@Radium
class DealShow extends Component {

  static propTypes = {
    model: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
  }

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  }

  defaultState = {
    start: false,
    closed: false,
    removed: false,
    inCart: false
  }

  state = this.defaultState

  resetState() {
    this.setState(this.defaultState);
    this.setState({ removed: true });
  }

  closeHandle() {
    this.setState({ closed: true });
    this.props.onClose();
    const el = this.refs.root;
    el ? el.addEventListener('transitionend', ::this.resetState) : null;
  }

  addToCart() {
    this.setState({ inCart: true });
  }

  componentDidMount() {
    setTimeout(() => this.setState({ start: true }), 0);
  }


  render() {
    const { model } = this.props;
    const styles = this.getStyles();

    return (
      <section style={ styles.root } >
        <div style={ styles.flexContainer }>

          <div style={ [ styles.pic, styles.flexItem ] } onClick={ ::this.closeHandle } >
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
            <button
              onClick={ ::this.addToCart }
              style={ [
                styles.btn,
                this.state.inCart && styles.btn_expanded
              ] } >
              Buy
            </button>
          </div>
        </div>

        <section styles={ this.state.inCart && styles.toCartPopupWrap_active } >
          <div
            ref='toCartMsg'
            style={ [
              styles.toCartPopupMsg,
              this.state.inCart && styles.toCartPopupMsg_active
            ] } >
            <p>Are you sure?</p>
            <button>Ya!</button>
          </div>
        </section>

      </section>
    );
  }

  getStyles() {
    const { innerHeight = 480 } = process.env.BROWSER ? window : {};
    const picBackgroundUrl = 'url(http://lorempixel.com/400/400/cats)';
    const toCartMsgEl = this.refs.toCartMsg;
    window.toCartMsgEl = toCartMsgEl;

    return {
      root: {
        width: '100%'
      },

      btn: {
        background: 'rgb(13, 113, 198)',
        padding: '2% 5%',
        border: 0,
        color: 'rgb(255, 255, 255)',
        fontSize: 24,
        position: 'absolute',
        right: '2em',
        bottom: '2em',
        transition: 'all .4s'
      },
      btn_expanded: {
        transform: toCartMsgEl ? `translateX(-100%) translateY(-100%)` : 0,
        opacity: 0,
        minWidth: '30em',
        minHeight: '8em'
      },

      flexContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        minHeight: innerHeight
      },
      flexItem: {
        flex: '0 0 100%',
        position: 'relative'
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
        width: '100%'
        // height: innerHeight - initHeight
      },
      additionText: {
        fontSize: 20
      },

      toCartPopupWrap_active: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0
      },
      toCartPopupMsg: {
        position: 'fixed',
        minWidth: '30em',
        minHeight: '10em',
        right: '2em',
        bottom: '2em',
        background: 'green',
        color: '#fff',
        transition: 'all .3s',
        display: 'none',
        opacity: 0
      },
      toCartPopupMsg_active: {
        display: 'block',
        opacity: 1
      }
    };
  }
}

export default DealShow;
