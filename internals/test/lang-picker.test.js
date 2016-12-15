/* eslint no-unused-expressions: 0 */

import test from 'ava'
import sinon from 'sinon'

import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import sinonChai from 'sinon-chai'

import LangPicker from 'components/shared/lang-picker'

import mount from './helpers/mount'

chai.use(sinonChai)
chai.use(chaiEnzyme())

test('it should have `en` locale active', () => {
  const { wrapper } = mount(LangPicker, { activeLocale: 'en' })
  expect(wrapper.find('.active')).to.have.text('en')
})

test('it should call `onChange` handler with new locale', () => {
  const spy = sinon.spy()
  const { wrapper } = mount(LangPicker, { activeLocale: 'en', onChange: spy })
  expect(wrapper).to.have.exactly(2).descendants('a')

  wrapper.find('a').not('.active').simulate('click')
  expect(spy).to.have.been.calledOnce
  expect(spy).to.have.been.calledWith('fr')
})
