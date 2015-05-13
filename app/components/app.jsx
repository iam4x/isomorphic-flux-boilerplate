'use strict';

import React from 'react';
import objectAssign from 'react/lib/Object.assign';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {RouteHandler} from 'react-router';

import Header from 'components/header';
import Footer from 'components/footer';

if (process.env.BROWSER) {
  require('styles/main.scss');
}

export default React.createClass({
  displayName: 'App',
  mixins: [ListenerMixin],
  propTypes: {
    flux: React.PropTypes.object.isRequired
  },
  getInitialState() {
    return this.props.flux.getStore('locale').getState();
  },
  componentDidMount() {
    this.listenTo(this.props.flux.getStore('locale'), this.handleLocaleChange);
    this.listenTo(this.props.flux.getStore('page-title'), this.handlePageTitleChange);
  },
  handleLocaleChange() {
    this.setState(this.props.flux.getStore('locale').getState());
  },
  handlePageTitleChange() {
    const {title} = this.props.flux.getStore('page-title').getState();
    document.title = title;
  },
  render() {
    const props: Object = objectAssign(this.state, this.props);
    return (
      <div>
        <Header {...props} />
        <RouteHandler {...props} />
        <Footer />
      </div>
    );
  }
});
