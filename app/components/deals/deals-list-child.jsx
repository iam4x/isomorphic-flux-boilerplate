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
    messages: PropTypes.object.isRequired
  }

  state = {
    active: this.props.active
  }

  openHandle() {
    this.setState({ active: true });
    this.props.onSelect();
  }

  render() {
    const { model } = this.props;
    const styles = this.getStyles();
    return (
      <section
        onClick={ ::this.openHandle }
        style={ styles.base } >
        <div style={ styles.title } >{ model.email }</div>
        <div style={ styles.text } >
          Some fish text is very impartant for this work now. Please, try it again and again.
        </div>
        <button style={ styles.btn } >More</button>
      </section>
    );
  }

  getStyles() {
    const height = 160;
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
        transition: [
          'opacity .2s ease-out',
          'margin-bottom .4s ease-out'
        ],
        opacity: 1
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
