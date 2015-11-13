import { Component, PropTypes } from 'react';
import Radium from 'utils/radium';

@Radium
class DealShowAnimation extends Component {
  static propTypes = {
    initWidth: PropTypes.string.isRequired,
    initHeight: PropTypes.string.isRequired
  }
}

export default DealShowAnimation;
