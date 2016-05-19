import React, { Component, PropTypes } from 'react'
import { IntlProvider } from 'react-intl'
import I18nProvider from './i18n-provider'

class I18nContainer extends Component {

  static propTypes = { children: PropTypes.node.isRequired }
  static contextTypes = { flux: PropTypes.object.isRequired }

  static childContextTypes = {
    messages: PropTypes.object.isRequired,
    formats: PropTypes.object.isRequired,
    locales: PropTypes.array.isRequired
  }

  constructor(props, context) {
    super(props, context)

    const { flux } = this.context
    this.state = flux.getStore('locale').getState()
  }

  getChildContext() {
    return { ...this.state }
  }

  componentDidMount() {
    const { flux } = this.context
    flux.getStore('locale').listen(this.handleLocaleChange)
  }

  componentWillUnmount() {
    const { flux } = this.context
    flux.getStore('locale').unlisten(this.handleLocaleChange)
  }

  handleLocaleChange = (state) => this.setState(state)

  render() {
    const { children } = this.props
    const { locales, messages } = this.state
    return (
      <IntlProvider locale={ locales[0] } messages={ messages } >
        <I18nProvider>
          { children }
        </I18nProvider>
      </IntlProvider>
    )
  }

}

export default I18nContainer
