import React, { Component, PropTypes } from 'react';
import Radium from 'utils/radium';
import theme from 'utils/theme';

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

  componentWillMount() {
    setTimeout(() => {
      this.setState({ started: true });
    });
  }

  close() {
    this.setState({ closed: true });
  }

  onOkClick() {
    this.close();
    this.props.btnOkCallback();
  }

  onCancelClick() {
    this.close();
    this.props.btnCancelCallback();
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
        top: 0,
        left: '-0.5em',
        width: this.state.closed ? 0 : '100vw',
        height: this.state.closed ? 0 : '100vh',
        display: this.state.closed ? 'none' : 'table',
        zIndex: 9
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
        background: '#6ea129',
        padding: '1em 3.0em',
        boxShadow: '2px 6px 26px 0 #999',
        transition: 'all .25s',
        transform: 'translateX(10vw) translateY(10vh) scale(0)',
        transformOrigin: 'right',
        boxSizing: 'content-box',
        '&:active': {
          transform: 'translateX(0) translateY(0) scale(1)'
        },
        [theme.media.small]: {
          padding: '0'
        }
      },
      btn: {
        margin: '1em',
        padding: '1em',
        background: '#f7f7f7',
        color: '#404040',
        border: 0,
        ':hover': {
          background: '#d2e981'
        },
        [theme.media.small]: {
          width: '100%',
          margin: 0,
          borderBottom: '1px solid #ccc'
        }
      }
    };
  }
}

export default ModalQuestion;
