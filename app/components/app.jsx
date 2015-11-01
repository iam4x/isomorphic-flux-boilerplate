import React, { Component, PropTypes } from 'react';
import InlineStylePrefixer from 'inline-style-prefixer';

import Header from 'components/header';
import Footer from 'components/footer';

if (process.env.BROWSER) require('styles/app.css');

class App extends Component {

  static propTypes = {
    flux: PropTypes.object.isRequired,
    children: PropTypes.element
  }

  static childContextTypes = {
    prefixer: PropTypes.object
  }

  constructor(props, context) {
    super(props, context);
    this.state = { i18n: props.flux.getStore('locale').getState() };
    // temp!
    this._userAgent = 'Android';
  }

  getChildContext() {
    return {
      prefixer: this._getPrefixer(this._userAgent)
    };
  }

  _getPrefixer(userAgent) {
    if (!this._userAgent !== userAgent) {
      this._userAgent = userAgent;
      this._prefixer = new InlineStylePrefixer(userAgent);
    }

    return this._prefixer;
  }

  componentDidMount() {
    const { flux } = this.props;
    flux.getStore('locale').listen(this._handleLocaleChange);
    flux.getStore('page-title').listen(this._handlePageTitleChange);
  }

  componentWillUnmount() {
    const { flux } = this.props;
    flux.getStore('locale').unlisten(this._handleLocaleChange);
    flux.getStore('page-title').unlisten(this._handlePageTitleChange);
  }

  _handleLocaleChange = (i18n) => this.setState({ i18n })
  _handlePageTitleChange = ({ title }) => document.title = title

  // If we have children components sent by `react-router`
  // we need to clone them and add them the correct
  // locale and messages sent from the Locale Store
  renderChild = (child) =>
    React.cloneElement(child, { ...this.state.i18n });

  render() {
    return (
      <div>
        <Header
          {...this.state.i18n}
          flux={ this.props.flux } />
        <hr />
        { React.Children
            .map(this.props.children, this.renderChild) }
        <hr />
        <Footer />
      </div>
    );
  }

}

export default App;
