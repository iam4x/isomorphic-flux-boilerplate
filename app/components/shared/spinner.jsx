import React, { Component, PropTypes } from 'react';
import Radium from 'utils/radium';

@Radium
class Spinner extends Component {

  static propTypes = { active: PropTypes.bool }

  render() {
    const { active } = this.props;
    const { spinner } = this.styles;
    return <div style={ [ spinner, active && spinner['&:active'] ] }></div>;
  }

  styles = {
    spinner: {
      position: 'absolute',
      top: 5,
      left: 5,
      width: 50,
      height: 50,
      background: 'rgba(0, 0, 0, .3)',
      display: 'none',
      '&:active': {
        display: 'relative'
      }
    }
  }
}

export default Spinner;
