/* eslint react/jsx-filename-extension: 0 */

import React from 'react'
import { mount } from 'enzyme'

import createFlux from 'flux/createFlux'
import I18nContainer from 'utils/i18n-container'

import ApiClient from '../../../shared/api-client'

export default (Component, props = {}, customfluxInstance) => {
  const client = new ApiClient()
  const flux = (typeof customfluxInstance === 'object') ?
    customfluxInstance : createFlux(client)

  if (customfluxInstance === true) return flux

  const { messages } = require('data/en')

  flux
    .getActions('locale')
    .switchLocale({ locale: 'en', messages })

  const wrapper = mount(
    <I18nContainer><Component { ...props } /></I18nContainer>,
    { context: { flux } }
  )

  return { flux, wrapper }
}
