'use strict';

import React from 'react';
import {assign} from 'lodash';
import {RouteHandler} from 'react-router';

import Header from 'components/header';
import Footer from 'components/footer';

if (process.env.BROWSER) {
  require('styles/main.scss');
}

export default class App extends React.Component {
  static propTypes = {
    flux: React.PropTypes.object.isRequired
  }

  state = this.props.flux
    .getStore('locale')
    .getState();

  componentDidMount() {
    this.props.flux
      .getStore('locale')
      .listen(this._handleLocaleChange);

    this.props.flux
      .getStore('page-title')
      .listen(this._handlePageTitleChange);
  }

  componentWillUnmount() {
    this.props.flux
      .getStore('locale')
      .unlisten(this._handleLocaleChange);

    this.props.flux
      .getStore('page-title')
      .unlisten(this._handlePageTitleChange);
  }

  _handleLocaleChange = this._handleLocaleChange.bind(this)
  _handleLocaleChange(state: Object) {
    return this.setState(state);
  }

  _handlePageTitleChange({title}) {
    document.title = title;
  }

  render() {
    const props: Object = assign({}, this.state, this.props);
    return (
      <div>
        <Header {...props} />
        <RouteHandler {...props} />
        <Footer />
      </div>
    );
  }
}
