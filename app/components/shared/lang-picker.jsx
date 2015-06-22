import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

if (process.env.BROWSER) {
  require('styles/lang-picker.scss');
}

class LangPicker extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  constructor(props: ?Object = {}) {
    super(props);

    const locale: string = props.store.getLocale();
    this.state = {locale};
  }

  componentDidMount() {
    this.props.store.listen(this._handleStoreChange);
  }

  componentWillUnmount() {
    this.props.store.unlisten(this._handleStoreChange);
  }

  _handleStoreChange = this._handleStoreChange.bind(this)
  _handleStoreChange() {
    const locale: string = this.props.store.getLocale();
    return this.setState({locale});
  }

  _handleClick(locale: string) {
    if (locale !== this.state.locale) {
      this.props.actions.switchLocale(locale);
    }
  }

  renderLocales(locales: Array = []) {
    return locales.map((locale, index) => {
      const klass: string = classNames({active: locale === this.state.locale});
      return (
        <li key={index}>
          <a
            className={klass}
            onClick={this._handleClick.bind(this, locale)}>
            {locale}
          </a>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className='lang--picker un-select'>
        {this.renderLocales(['en', 'fr'])}
      </ul>
    );
  }
}

export default LangPicker;
