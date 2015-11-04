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

  clickHandle() {
    this.setState({ expandStart: true });
    process.env.BROWSER &&
      window.requestAnimationFrame(() => {
        this.setState({ expandPositioned: true });
      });
  }

  closeExtend() {
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
        onClick={ ::this.clickHandle } >

        <section
          style={ [
            styles.main,
            this.state.expandPositioned && styles.mainExpanded
          ] } >
          { model.user.email }
        </section>

        { this.state.expandStart &&
          <section
            key='0'
            ref='expandedEl'
            onClick={ ::this.closeExtend }
            style={ [
              styles.main,
              styles.mainCopy,
              this.state.expandPositioned && styles.mainCopyExpanded,
              this.state.expandClose && styles.mainCopyClosed,
              this.state.expandRemoved && { display: 'none' }
            ] } >
            { model.user.email }
          </section>
        }
      </div>
    );
  }

  getStyles() {
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
      main: {
        padding: '1em',
        height: 100,
        boxSizing: 'border-box',
        border: '1px solid #fff',
        backgroundImage: 'url(http://lorempixel.com/400/400/cats)',
        backgroundSize: 'cover',
        transition: 'all .2s ease-in-out'
      },
      mainExpanded: {
        opacity: 0,
        marginBottom: window.innerHeight - 100
      },
      mainCopy: {
        position: 'absolute',
        marginTop: '-100px',
        width: '25%',
        transition: 'all .4s ease-in'
      },
      mainCopyExpanded: {
        width: window.innerWidth,
        height: window.innerHeight,
        marginTop: -window.innerHeight,
        marginLeft: () => {
          const { expandedEl } = this.refs;
          return expandedEl ? -expandedEl.offsetLeft : null;
        }()
      },
      mainCopyClosed: {
        opacity: 0,
        width: '25%',
        height: 100
      }
    };
  }
}

export default DealItem;
