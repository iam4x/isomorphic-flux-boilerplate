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

  state = { buyClicked: false, inCart: false }

  addToCart() {
    this.setState({ buyClicked: true });
  }

  goToCart() {
    console.log('go to cart');
  }

  render() {
    const { model } = this.props;
    const { root, title, btn } = this.getStyles();

    return (
      <div style={ root } >
        <div style={ title } onClick={ ::this.props.onClose } >{ model.email }</div>
        <button
          onClick={ ::this.addToCart }
          style={ [ btn,
            this.state.buyClicked && btn['&:activated']
          ] } >
          Buy
        </button>

        { this.state.buyClicked &&
          <ModalQuestion
            btnOkLabel='Перейти в корзину'
            btnCancelLabel='Продолжить покупки'
            btnOkCallback={ ::this.goToCart }
            btnCancelCallback={ ::this.props.onClose } >
            A u sure?
          </ModalQuestion> }
      </div>
    );
  }

  getStyles() {
    return {
      root: {
        minHeight: 600,
        background: '#fff'
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
        transition: 'all .3s',
        '&:activated': {
          opacity: 0,
          transform: 'translateX(-20vw) translateY(-20vh) scale(2)'
        }
      },

      title: {
        padding: 10,
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
      }
    };
  }
}

export default DealShow;
