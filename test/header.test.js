import test from 'ava'

import mount from './helpers/mount'
import Header from 'components/header'

import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme())

test('it should render links correctly', () => {
  const { wrapper } = mount(Header)
  expect(wrapper.find('.app--navbar')).to.have.exactly(3).descendants('li')
})

test('it should render lang picker correctly', () => {
  const { wrapper } = mount(Header)
  expect(wrapper.find('.lang--picker')).to.have.exactly(2).descendants('li')
})

test('it should handle requests change', () => {
  const { wrapper, flux } = mount(Header)

  flux.getActions('requests').start()
  expect(wrapper.find('.app--spinner')).to.have.className('active')

  flux.getActions('requests').stop()
  expect(wrapper.find('.app--spinner')).to.not.have.className('active')
})
