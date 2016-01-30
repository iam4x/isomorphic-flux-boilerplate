import React, { Component, PropTypes } from 'react';
import radium from 'radium';
import imageResolver from 'utils/image-resolver';

const spinnerImg = process.env.BROWSER ?
  require('images/spinner.svg') :
  imageResolver('images/spinner.svg');

@radium
class Spinner extends Component {

  static propTypes = { active: PropTypes.bool }

  render() {
    const { active } = this.props;
    const { spinner } = this.styles;
    return <div style={ [ spinner, active && spinner['&:active'] ] } />;
  }

  styles = {
    spinner: {
      backgroundImage: `url(${spinnerImg})`,
      backgroundRepeat: 'no-repeat',
      display: 'none',
      height: 44,
      position: 'absolute',
      right: 10,
      top: 10,
      width: 44,
      '&:active': {
        display: 'block'
      }
    }
  }
}

export default Spinner;
