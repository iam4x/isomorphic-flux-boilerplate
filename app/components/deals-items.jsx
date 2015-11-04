import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';
import Radium from 'utils/radium';

@connect(({ dealContainers }) => ({ ...dealContainers }))
@Radium
class DealsItems extends Component {

  static propTypes = { dealContainers: PropTypes.array.isRequired }

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  }

  getStyles() {
    return {
      itemBox: {
        width: '20%',
        height: '100px',
        backgroundColor: 'blue'
      }
    };
  }

  componentWillMount() {
    const { flux } = this.context;
    flux.getActions('dealContainers').fetch();
  }

  render() {
    return (
      <div>
        <div style={ this.getStyles().itemBox }></div>
      </div>
    );
  }
}

export default DealsItems;
