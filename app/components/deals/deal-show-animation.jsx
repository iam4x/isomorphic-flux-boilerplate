import React, { Component, PropTypes } from 'react';
import Radium from 'utils/radium';

@Radium
class DealShowAnimation extends Component {
  static propTypes = {
    initWidth: PropTypes.string.isRequired,
    initHeight: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
  }

  componentWillMount() {
    const childs = this.props.children;
    console.log(childs);
  }

  render() {
    return (
      <div>{ this.props.children }</div>
    );
  }
}

export default DealShowAnimation;
