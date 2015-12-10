import React, { Component, PropTypes } from 'react';
import Radium from 'utils/radium';

@Radium
class ModalQuestion extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    btnOkLabel: PropTypes.string,
    btnCancelLabel: PropTypes.string,
    btnOkCallback: PropTypes.func.isRequired,
    btnCancelCallback: PropTypes.func
  }

  props = {
    btnOkLabel: 'OK',
    btnCancelLabel: 'Cancel'
  }

  state = {
    started: false
    closed: false
  }

  componentWillMount() {
    setTimeout( () => this.setState({ started: true }) );
  }

  close() {
    this.setState({ closed: true });
  }

  render() {
    const { overlay, box, msg } = this.getStyles();
    return (
      <div style={ overlay } >
        <div style={ [ box ] } >
          <div style={ [ msg, this.state.started && msg['&:active'] ] }>
            <div>{ this.props.children }</div>
            <button onClick={ this.props.btnOkCallback } >
              { this.props.btnOkLabel && this.close() }
            </button>
            <button onClick={ this.props.btnCancelCallback } >
              { this.props.btnCancelLabel && this.close() }
            </button>
          </div>
        </div>
      </div>
    );
  }

  getStyles() {
    return {
      overlay: {
        position: 'fixed',
        display: 'table',
        width: this.state.closed ? '100vw' : 0,
        height: this.state.closed ? '100vh' : 0
      },
      box: {
        display: 'table-cell',
        textAlign: 'center',
        verticalAlign: 'middle'
      },
      msg: {
        display: 'inline-block',
        boxShadow: '2px 6px 26px 0 #999',
        transition: 'all .25s',
        transform: 'translateX(10vw) translateY(20vh) scale(0)',
        transformOrigin: 'left top',
        '&:active': {
          transform: 'translateX(0) translateY(0) scale(1)'
        },
        minWidth: '30vw',
        maxWidth: '98vw',
        color: 'blue',
        background: 'white',
        padding: '5em'
      }
    };
  }
}

export default ModalQuestion;
