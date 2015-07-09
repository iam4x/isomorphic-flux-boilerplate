import React, {Component} from 'react/addons';
import AltIso from 'alt/utils/AltIso';

import LocaleStore from 'flux/stores/locale';
import PageTitleStore from 'flux/stores/page-title';

import Header from 'components/header';
import Footer from 'components/footer';

if (process.env.BROWSER) {
  require('styles/main.scss');
}

@AltIso.define(({locale}) => LocaleStore.switch(locale))
class App extends Component {

  state = {i18n: LocaleStore.getState()}

  componentDidMount() {
    LocaleStore.listen(this._handleLocaleChange);
    PageTitleStore.listen(this._handlePageTitleChange);
  }

  componentWillUnmount() {
    LocaleStore.unlisten(this._handleLocaleChange);
    PageTitleStore.unlisten(this._handlePageTitleChange);
  }

  _handleLocaleChange = ::this._handleLocaleChange
  _handleLocaleChange(i18n) {
    return this.setState({i18n});
  }

  _handlePageTitleChange({title}) {
    document.title = title;
  }

  // If we have children components sent by `react-router`
  // we need to clone them and add them the correct
  // locale and messages sent from the Locale Store
  renderChild = ::this.renderChild
  renderChild(child) {
    return React.addons
      .cloneWithProps(child, {...this.state.i18n});
  }

  render() {
    return (
      <div>
        <Header {...this.state.i18n} />
        <hr />
        {
          React.Children
            .map(this.props.children, this.renderChild)
        }
        <hr />
        <Footer />
      </div>
    );
  }

}

export default App;
