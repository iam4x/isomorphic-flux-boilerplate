import React, { Component, PropTypes } from 'react';
import Radium from 'utils/radium';

@Radium
class DealsListChild extends Component {

  static propTypes = {
    model: PropTypes.object.isRequired,
    active: PropTypes.bool,
    onSelect: PropTypes.func
  }

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
    history: PropTypes.object
  }

  state = {
    active: this.props.active
  }

  openHandle() {
    this.setState({ active: true });
    this.props.onSelect();
    this.context.history
      .replaceState(null, 'deals', { id: this.props.model.id });
      // .transitionTo('deals', { id: this.props.model.id });
    this.refs.root ? this.refs.root.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    }) : void 0;
    return false;
  }

  render() {
    const { model } = this.props;
    const styles = this.getStyles();
    return (
      <section
        ref='root'
        onClick={ ::this.openHandle }
        style={ styles.base } >

        <img
          src={ model.pic }
          alt='deal picture'
          style={ styles.pic } />
        <div style={ styles.discount } >
          до { model.discount }%
        </div>
        <div style={ styles.title } >
          { model.title }
        </div>
        <div style={ styles.cost } >
          от { model.cost } руб.
        </div>
        <button style={ styles.btn } >
          Подробнее
        </button>

      </section>
    );
  }

  getStyles() {
    const height = 320;
    const picBackgroundUrl = 'url(http://lorempixel.com/400/400/cats)';

    return {
      base: {
        position: 'relative',
        height: height,
        boxSizing: 'border-box',
        border: '1px solid #fff',
        backgroundImage: picBackgroundUrl,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 1,
        // overflow: 'hidden',
        transition: [
          'opacity .2s ease-out',
          'margin-bottom .4s ease-out'
        ],
        opacity: 1
      },

      pic: {
        minWidth: '100%'
      },

      discount: {
        fontSize: 16,
        margin: 12,
        padding: 6,
        textAlign: 'center',
        background: 'rgba(255, 255, 255, .5)'
      },

      title: {
        background: 'rgba(0, 0, 100, .5)',
        padding: 10,
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
      },

      cost: {

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
