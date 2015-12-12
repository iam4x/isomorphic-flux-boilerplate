import React, { Component, PropTypes } from 'react';
import Radium from 'utils/radium';

import ModalQuestion from 'components/shared/modal-question';

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

  state = {
    buyClicked: false,
    inCart: false,
    msgClosed: false
  }

  addToCart() {
    this.setState({ buyClicked: true });
  }

  goToCart() {
    console.log('go to cart');
  }

  close() {
    this.props.onClose();
    this.setState({ msgClosed: true });
  }

  render() {
    const { model } = this.props;
    const { root, title, btn } = this.getStyles();

    return (
      <div style={ root } >
        <span style={ title } onClick={ ::this.close } >{ model.email }</span>
        <button
          onClick={ ::this.addToCart }
          style={ [ btn,
            this.state.buyClicked && btn['&:activated']
          ] } >
          Buy
        </button>

        { this.state.buyClicked && !this.state.msgClosed &&
          <ModalQuestion
            show={ this.state.msgClosed }
            btnOkLabel='Перейти в корзину'
            btnCancelLabel='Продолжить покупки'
            btnOkCallback={ ::this.goToCart }
            btnCancelCallback={ ::this.close } >
            A u sure?
          </ModalQuestion> }
      </div>
    );
  }

  getStyles() {
    return {
      root: {
        minHeight: 600,
        background: '#fff',
        boxShadow: '0 1em 2em #999'
      },

      btn: {
        background: 'rgb(13, 113, 198)',
        padding: '2% 5%',
        border: 0,
        color: 'white',
        fontSize: 24,
        position: 'absolute',
        right: '2em',
        bottom: '2em',
        transition: 'all .3s',
        '&:activated': {
          opacity: 0,
          transform: 'translateX(-35vw) translateY(-12vh) scale(2.6, 2)'
        }
      },

      title: {
        padding: 10,
        fontSize: '4em',
        textAlign: 'center'
      }
    };
  }
}

export default DealShow;
