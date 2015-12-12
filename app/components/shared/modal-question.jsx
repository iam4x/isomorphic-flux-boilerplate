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
    started: false,
    closed: false
  }

  componentDidMount() {
    window.requestAnimationFrame( () => {
      this.setState({ started: true });
    });
  }

  close() {
    this.setState({ closed: true });
  }

  onOkClick() {
    this.props.btnOkCallback();
    this.close();
  }

  onCancelClick() {
    this.props.btnCancelCallback();
    this.close();
  }

  render() {
    const { overlay, box, msg, btn } = this.getStyles();
    return (
      <div style={ overlay } >
        <div style={ box } >
          <div style={ [ msg, this.state.started && msg['&:active'] ] }>
            <div>{ this.props.children }</div>
            <button
              key='btnOk'
              style={ btn }
              onClick={ ::this.onOkClick } >
              { this.props.btnOkLabel }
            </button>
            <button
              key='btnCancel'
              style={ btn }
              onClick={ ::this.onCancelClick } >
              { this.props.btnCancelLabel }
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
        width: this.state.closed ? 0 : '100vw',
        height: this.state.closed ? 0 : '100vh',
        display: this.state.closed ? 'none' : 'table'
      },
      box: {
        display: 'table-cell',
        textAlign: 'center',
        verticalAlign: 'middle'
      },
      msg: {
        display: 'inline-block',
        minWidth: '30vw',
        maxWidth: '98vw',
        color: '#fff',
        background: 'rgb(13, 113, 198)',
        padding: '2em',
        boxShadow: '2px 6px 26px 0 #999',
        transition: 'all .25s',
        transform: 'translateX(10vw) translateY(20vh) scale(0)',
        transformOrigin: 'right bottom',
        '&:active': {
          transform: 'translateX(0) translateY(0) scale(1)'
        }
      },
      btn: {
        margin: '1em',
        padding: '.6em',
        background: '#6fa229',
        color: '#fff',
        border: 0,
        ':hover': {
          background: '#6f0229'
        }
      }
    };
  }
}

export default ModalQuestion;
