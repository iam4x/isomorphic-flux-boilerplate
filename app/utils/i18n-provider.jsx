import debug from 'debug'

import React, { Component, PropTypes } from 'react'
import { intlShape, defineMessages } from 'react-intl'

class I18nProvider extends Component {

  static propTypes = { children: PropTypes.node.isRequired }

  static childContextTypes = {
    i18n: PropTypes.func.isRequired
  }

  static contextTypes = {
    intl: intlShape.isRequired
  }

  getChildContext() {
    return { i18n: this.i18n }
  }

  i18n = (key, values) => {
    try {
      const { formatMessage, locale, messages } = this.context.intl
      const messageObject = { }
      messageObject[locale] = {
        id: key,
        defaultMessage: messages[key]
      }

      return formatMessage({ messages: defineMessages(messageObject), id: key }, values)
    } catch (error) {
      debug('dev')(error)
      return `translation missing (${this.context.intl.locale}): ${key}`
    }
  }

  render() {
    const { children } = this.props
    return <span>{ children }</span>
  }
}

export default I18nProvider
