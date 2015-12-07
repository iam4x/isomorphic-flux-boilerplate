import React, { Component, PropTypes } from 'react';
import Radium, { Style, getPrefixedStyle } from 'utils/radium';

import Header from 'components/header';
import Footer from 'components/footer';
import normalize from 'styles/normalize';

@Radium
class App extends Component {

  static propTypes = { children: PropTypes.element }
  static contextTypes = { flux: PropTypes.object.isRequired }

  static childContextTypes = {
    messages: PropTypes.object.isRequired,
    locales: PropTypes.array.isRequired
  }

  state = { i18n: this.context.flux.getStore('locale').getState() }

  getChildContext() {
    const { i18n: { messages, locales } } = this.state;
    return { messages, locales };
  }

  componentDidMount() {
    const { flux } = this.context;

    flux.getStore('locale').listen(this.handleLocaleChange);
    flux.getStore('helmet').listen(this.handleTitleChange);
  }

  componentWillUnmount() {
    const { flux } = this.context;

    flux.getStore('locale').unlisten(this.handleLocaleChange);
    flux.getStore('helmet').unlisten(this.handleTitleChange);
  }

  handleLocaleChange = (i18n) => {
    this.setState({ i18n });
  }

  handleTitleChange({ titleBase, title }) {
    document.title = titleBase + title;
  }

  render() {
    const { children } = this.props;

    return (
      <div style={ this.styles.root }>
        <Style
          rules={ normalize }
          prefix={ getPrefixedStyle } />
        <Header />
        { children }
        <Footer />
      </div>
    );
  }

  styles = {
    root: {
      background: '#6fa229'
    },
    mediaQueries: {
      '(min-width: 550px)': {
        html: {
          fontSize: '120%',
          minWidth: '100%'
        },
        body: {
          minWidth: '100%'
        }
      }
    }
  }

}

export default App;
