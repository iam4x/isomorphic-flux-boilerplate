import React, { Component, PropTypes } from 'react';
import Radium from 'utils/radium';

@Radium
class Spinner extends Component {

  static propTypes = { active: PropTypes.bool }

  render() {
    const { active } = this.props;
    const { _normal, _active } = this.styles;
    return <div style={ [_normal, active && _active] }></div>;
  }

  styles = {
    _normal: {
      position: 'absolute',
      top: 5,
      left: 5,
      width: 50,
      height: 50,
      background: 'rgba(0, 0, 0, .3)',
      display: 'none'
    },
    _active: {
      display: 'relative'
    }
  }
}

export default Spinner;
