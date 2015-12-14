import React, { Component, PropTypes } from 'react';
import Radium from 'utils/radium';

import ModalQuestion from 'components/shared/modal-question';

@Radium
class DealShow extends Component {

  static propTypes = {
    model: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    id: PropTypes.bool
  }

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
    history: PropTypes.object
  }

  state = {
    closed: false,
    buyClicked: false,
    inCart: false,
    msgClosed: false
  }

  addToCart() {
    this.setState({ buyClicked: true });
  }

  goToCart() {
    this.context.history.pushState(null, 'cart');
  }

  close() {
    this.props.onClose();
    this.setState({ msgClosed: true, closed: true });
  }

  render() {
    const { model } = this.props;
    const styles = this.getStyles();

    return (
      <article style={ styles.root } >

        <header style={ styles.header } >
          <div
            style={ styles.pic }
            onClick={ ::this.close } />

          <h1 style={ styles.title } >{ model.title }</h1>

          <div style={ styles.stats }>
            Купили: 232
            <br/>
            До конца продаж осталось: 08:15:42
          </div>

          <div style={ styles.params } >
            <div style={ styles.cost } >
              от <strong style={ styles.costNum }>{ model.cost }</strong> руб
            </div>
            <button
              onClick={ ::this.addToCart }
              style={ [ styles.btn,
                this.state.buyClicked && styles.btn['&:activated']
              ] } >
              Купить
            </button>
          </div>

        </header>

        <div style={ styles.body }>
          <p>{ model.title }</p>
        </div>

        { this.state.buyClicked && !this.state.msgClosed &&
          <ModalQuestion
            show={ this.state.msgClosed }
            btnOkLabel='Перейти в корзину'
            btnCancelLabel='Продолжить покупки'
            btnOkCallback={ ::this.goToCart }
            btnCancelCallback={ ::this.close } >
            <p><small>Покупка уже в вашей корзине!</small></p>
            <p>Что делаем дальше?</p>
          </ModalQuestion> }
      </article>
    );
  }

  getStyles() {
    return {
      root: {
        minHeight: '100vh',
        background: '#fff',
        color: '#404040'
      },

      header: {
        background: '#f7f7f7',
        display: 'flex',
        flexFlow: 'row wrap'
      },

      pic: {
        minWidth: '100%',
        minHeight: '33vh',
        maxHeight: '33vh',
        boxShadow: '0 -4em 3em #000 inset',
        backgroundImage: `url(${this.props.model.pic})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        flex: '2 0'
      },

      title: {
        display: 'inline-block',
        fontWeight: 'normal',
        fontSize: '1.6em',
        margin: '-1.6em 1em 0 1em',
        color: 'white',
        flex: '2 100%'
      },

      stats: {
        flex: '1 50%',
        padding: '.5em 1em',
        boxSizing: 'border-box',
        lineHeight: '2em'
      },

      params: {
        flex: '1 50%',
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        textAlign: 'right',
        padding: '.5em',
        boxSizing: 'border-box'
      },

      cost: {
        flex: '1 50%'
      },

      costNum: {
        fontSize: '2.6em',
        fontWeight: 'normal'
      },

      body: {
        flex: '1 100%',
        padding: '0 1em'
      },

      btn: {
        background: '#6ea129',
        padding: '1em 2.4em',
        border: 0,
        color: 'white',
        fontSize: '1.2em',
        transition: 'all .4s',
        marginLeft: '1em',
        flex: '1 50%',
        zIndex: 8,
        '&:activated': {
          opacity: 0,
          transform: 'translateX(-40vw) translateY(0) scale(3, 2)'
        }
      }
    };
  }
}

export default DealShow;
