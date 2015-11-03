import React, { Component, PropTypes } from 'react';

import Header from 'components/header';
import Footer from 'components/footer';

if (process.env.BROWSER) require('styles/app.css');

class App extends Component {

  static propTypes = {
    flux: PropTypes.object.isRequired,
    children: PropTypes.element
  }

  static childContextTypes = {
    flux: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
    locales: PropTypes.array.isRequired
  }

  state = { i18n: this.props.flux.getStore('locale').getState() }

  getChildContext() {
    const { flux } = this.props;
    const { i18n: { messages, locales } } = this.state;

    return { flux, messages, locales };
  }

  componentDidMount() {
    const { flux } = this.props;

    flux.getStore('locale').listen(this.handleLocaleChange);
    flux.getStore('page-title').listen(this.handleTitleChange);
  }

  componentWillUnmount() {
    const { flux } = this.props;

    flux.getStore('locale').unlisten(this.handleLocaleChange);
    flux.getStore('page-title').unlisten(this.handleTitleChange);
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
