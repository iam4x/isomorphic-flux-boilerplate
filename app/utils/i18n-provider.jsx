import debug from 'debug'

import React, { Component, PropTypes } from 'react'
import { toPath } from 'lodash'

class I18nProvider extends Component {

  static propTypes = { children: PropTypes.node.isRequired }

  static childContextTypes = {
    i18n: PropTypes.func.isRequired
  }

  static contextTypes = {
    intl: PropTypes.object.isRequired
  }

  getChildContext() {
    return { i18n: this.i18n }
  }

  i18n = (key) => {
    try {
      return toPath(key).reduce((prec, x) => prec[x], this.context.intl.messages)
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
