import React, { Component, PropTypes } from 'react';
import Radium from 'utils/radium';

@Radium
class DealsItems extends Component {
  static propTypes = {
    flux: PropTypes.object.isRequired
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

  state = this.props.flux
    .getStore('deal-containers')
    .getState()

  componentWillMount() {
    this.props.flux
      .getActions('deal-containers')
      .fetch();
  }

  componentDidMount() {
    this.props.flux
      .getStore('deal-containers')
      .listen(this._handleStoreChange);
  }

  componentWillUnmount() {
    this.props.flux
      .getStore('deal-containers')
      .unlisten(this._handleStoreChange);
  }

  _handleStoreChange = (state) => {
    return this.setState(state);
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
