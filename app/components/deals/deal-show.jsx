import React, { Component, PropTypes } from 'react';
import Radium from 'utils/radium';
import connect from 'connect-alt';
import theme from 'utils/theme';

import ModalQuestion from 'components/shared/modal-question';

@connect(({ dealContainers: { current } }) => ({ current }))
@Radium
class DealShow extends Component {

  static propTypes = {
    params: PropTypes.object,
    model: PropTypes.object,
    current: PropTypes.object,
    onClose: PropTypes.func
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

  componentWillMount() {
    const { flux } = this.context;
    const id = this.props.params && this.props.params.id ||
      this.props.current && this.props.current.id;

    flux.getActions('dealContainers').show(id);
  }

  getModel() {
    return this.props.model || this.props.current || {};
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
    const model = this.getModel();
    const styles = this.getStyles();

    if (model) {
      const { title, cost } = model;

      return (
        <article style={ styles.root } >

          <header style={ styles.header } >
            <div
              style={ styles.pic }
              onClick={ ::this.close } />
            <div style={ styles.close } >×</div>

            <h1 style={ styles.title } >{ title }</h1>

            <div style={ styles.stats } >
              Купили: 232
              <br/>
              До конца продаж осталось: 08:15:42
            </div>

            <div style={ styles.params } >
              <div style={ styles.cost } >
                от <strong style={ styles.costNum }>{ cost }</strong> руб
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
            <p>{ title }</p>
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

    return (<h2>DealContainer not found</h2>);
  }

  getStyles() {
    const model = this.getModel();
    if (!model) return {};

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
        backgroundImage: `url(${model.pic})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        flex: '2 0',
        [theme.media.small]: {
          minWidth: 'auto',
          minHeight: '50vh'
        }
      },

      close: {
        position: 'absolute',
        top: 0,
        right: '.1em',
        lineHeight: '.5em',
        fontSize: '2em',
        opacity: '.6'
      },

      title: {
        display: 'inline-block',
        fontWeight: 'normal',
        fontSize: '1.5em',
        margin: '-1.6em 1em 0 1em',
        color: 'white',
        flex: '2 100%',
        [theme.media.small]: {
          fontSize: '1.2em',
          margin: '-3em .5em 0 .5em'
        }
      },

      stats: {
        flex: '1 50%',
        padding: '.5em 1em',
        boxSizing: 'border-box',
        lineHeight: '2em',
        [theme.media.small]: {
          display: 'none'
        }
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
        flex: '1 50%',
        [theme.media.small]: {
          fontSize: '.8em'
        }
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
          transform: 'translateX(-35vw) translateY(10vh) scale(2.8, 2.5)'
        },
        [theme.media.small]: {
          padding: '.8em 1em'
        }
      }
    };
  }
}

export default DealShow;
