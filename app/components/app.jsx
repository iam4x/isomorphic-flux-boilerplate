import React, { Component, PropTypes } from 'react';
import InlineStylePrefixer from 'inline-style-prefixer';
import Radium from 'utils/radium';

import Header from 'components/header';
import Footer from 'components/footer';

@Radium
class App extends Component {

  static propTypes = { children: PropTypes.element }
  static contextTypes = { flux: PropTypes.object.isRequired }

  static childContextTypes = {
    messages: PropTypes.object.isRequired,
    locales: PropTypes.array.isRequired
  }

<<<<<<< HEAD
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
    const { flux } = this.context;

    flux.getStore('locale').listen(this.handleLocaleChange);
    flux.getStore('title').listen(this.handleTitleChange);
  }

  componentWillUnmount() {
    const { flux } = this.context;

    flux.getStore('locale').unlisten(this.handleLocaleChange);
    flux.getStore('title').unlisten(this.handleTitleChange);
  }

  handleLocaleChange = (i18n) => this.setState({ i18n })
  handleTitleChange = ({ title }) => document.title = title

  render() {
    const { children } = this.props;

    return (
      <div>
        <Header />
        <hr />
        { children }
        <hr />
        <Footer />
      </div>
    );
  }

}

export default App;
