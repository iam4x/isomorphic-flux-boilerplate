import debug from 'debug';

import { Component, PropTypes } from 'react';
import { IntlMixin } from 'react-intl';

class I18nContainer extends Component {

  static propTypes = { children: PropTypes.element.isRequired }
  static contextTypes = { flux: PropTypes.object.isRequired }

  static childContextTypes = {
    i18n: PropTypes.func.isRequired,
    messages: PropTypes.object.isRequired,
    formats: PropTypes.object.isRequired,
    locales: PropTypes.array.isRequired
  }

  constructor(props, context) {
    super(props, context);

    const { flux } = this.context;
    this.state = flux.getStore('locale').getState();
  }

  getChildContext() {
    return { ...this.state, i18n: this.i18n };
  }

  componentDidMount() {
    const { flux } = this.context;
    flux.getStore('locale').listen(this.handleLocaleChange);
  }

  componentWillUnmount() {
    const { flux } = this.context;
    flux.getStore('locale').unlisten(this.handleLocaleChange);
  }

  handleLocaleChange = (state) => {
    return this.setState(state);
  }

  i18n = (key, values) => {
    try {
      // Fake IntlMixin context with `messages`, `formats` and `locales`
      // into `this.props` and `this.context`
      const ctx = { ...IntlMixin, context: this.state, props: this.state };

      const messages = IntlMixin.getIntlMessage.call(ctx, key);
      return IntlMixin.formatMessage.call(ctx, messages, values);
    } catch (error) {
      debug('dev')(error);
      return `translation missing (${this.state.locales[0]}): ${key}`;
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }

}

export default I18nContainer;
