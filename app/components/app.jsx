import React, { Component, PropTypes } from 'react';
import { StyleRoot, Style } from 'radium';
import { getUserAgent, matchMedia } from 'utils/radium';
import normalize from 'styles/normalize';

import Header from 'components/header';
import Footer from 'components/footer';

class App extends Component {

  static propTypes = { children: PropTypes.element }
  static contextTypes = { flux: PropTypes.object.isRequired }

  state = { i18n: this.context
      .flux.getStore('locale').getState() }

  componentDidMount() {
    const { flux } = this.context;
    flux.getStore('helmet').listen(this.handleTitleChange);
  }

  componentWillUnmount() {
    const { flux } = this.context;
    flux.getStore('helmet').unlisten(this.handleTitleChange);
  }

  handleTitleChange({ titleBase, title }) {
    document.title = titleBase + title;
  }

  render() {
    const { children } = this.props;
    const userAgent = getUserAgent();

    return (
      <div>
        <StyleRoot radiumConfig={ { userAgent, matchMedia } } >
          <Style rules={ normalize } />
          <Style rules={ this.styles } />
          <Header />
          <hr />
          { children }
          <hr />
          <Footer />
        </StyleRoot>
      </div>
    );
  }

  styles = {
    body: {
      background: '#fff',
      WebkitTapHighlightColor: 'transparent',
      fontFamily: 'Roboto,Helvetica Neue,Helvetica,Arial,sans-serif'
    },
    mediaQueries: {
      '(min-width: 380px)': {
        body: {
          fontSize: '105%'
        }
      },
      '(min-width: 600px)': {
        body: {
          fontSize: '110%'
        }
      }
    }
  }
}

export default App;
