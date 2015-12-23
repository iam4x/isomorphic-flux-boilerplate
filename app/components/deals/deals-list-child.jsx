import React, { Component, PropTypes } from 'react';
import Radium from 'utils/radium';
const { BROWSER } = process.env;

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

  openHandle(event) {
    event.preventDefault();
    this.setState({ active: true });
    this.props.onSelect();

    if (BROWSER) {
      const id = this.props.model.id;
      const { root } = this.refs;

      this.context.history.replaceState(null, 'deals', { id });
      root && root.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  render() {
    const { model } = this.props;
    const styles = this.getStyles();
    return (
      <a
        ref='root'
        href={ `/deals/${model.id}` }
        onClick={ ::this.openHandle }
        style={ styles.base } >

        <img
          src={ model.pic }
          alt='deal picture'
          style={ styles.pic } />
        <div style={ styles.discount } >
          до { model.discount }%
        </div>
        <div style={ styles.content } >
          <div style={ styles.title } >
            { model.title }
          </div>
          <div style={ styles.contentBox }>
            <div style={ styles.cost } >
              от <strong style={ styles.costValue }>{ model.cost }</strong> руб.
            </div>
            <button style={ styles.btn } >
              Подробнее
            </button>
          </div>
        </div>
      </a>
    );
  }

  getStyles() {
    const height = 320;
    const picBackgroundUrl = 'url(http://lorempixel.com/400/400/cats)';

    return {
      base: {
        height,
        position: 'relative',
        boxSizing: 'border-box',
        boxShadow: '0 .15em .2em #e7e7e7',
        border: '1px solid #fff',
        backgroundImage: picBackgroundUrl,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        zIndex: 1,
        opacity: 1,
        overflow: 'hidden',
        transition: [
          'opacity .2s ease-out',
          'margin-bottom .4s ease-out'
        ]
      },

      pic: {
        minWidth: '100%'
      },

      discount: {
        position: 'absolute',
        top: 0,
        right: 0,
        fontSize: '.9em',
        margin: '.5em',
        padding: '.4em .6em',
        textAlign: 'center',
        background: 'rgba(0, 0, 0, .5)',
        color: 'white'
      },

      content: {
        position: 'absolute',
        width: '100%',
        bottom: 0
      },

      contentBox: {
        background: '#f7f7f7',
        display: 'flex',
        flexFlow: 'row nowrap',
        lineHeight: '2.5em',
        textAlign: 'center',
        alignItems: 'center'
      },

      title: {
        background: 'rgba(0, 0, 0, .6)',
        padding: '.6em .4em',
        fontSize: '.8em',
        textAlign: 'center',
        color: 'white'
      },

      cost: {
        flex: '1 50%',
        color: '#595959',
        fontSize: '.8em'
      },

      costValue: {
        fontSize: '1.6em',
        fontWeight: 'normal'
      },

      btn: {
        background: '#6ea129',
        border: 0,
        color: 'rgb(255, 255, 255)',
        fontSize: '1em',
        flex: '1 50%'
      }
    };
  }
}

export default DealsListChild;
