import React, { Component, PropTypes } from 'react';

class Cart extends Component {

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  }

  render() {
    return (<h1 style={ { textAlign: 'center', color: 'white' } }>Coming soon...</h1>);
  }

}

export default Cart;
