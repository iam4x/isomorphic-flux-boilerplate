import React, { Component, PropTypes } from 'react';

class NotFound extends Component {

  static contextTypes = { flux: PropTypes.object.isRequired }

  componentWillMount() {
    const { flux } = this.context;
    flux.getActions('helmet')
      .update({ title: 'Page not found', statusCode: 404 });
  }

  render() {
    return <h1>404</h1>;
  }

}

export default NotFound;
