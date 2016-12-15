import defer from 'lodash/defer'
import test from 'ava'

import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'

import Header from 'components/header'

import mount from './helpers/mount'

chai.use(chaiEnzyme())

test.beforeEach((t) => {
  t.context.data = mount(Header)
})

test.afterEach(({ context: { data } }) => data && data.wrapper.unmount())

test('it should render links correctly', ({ context: { data: { wrapper } } }) => {
  expect(wrapper.find('.app--navbar')).to.have.exactly(3).descendants('li')
})

test('it should render lang picker correctly', ({ context: { data: { wrapper } } }) => {
  expect(wrapper.find('.lang--picker')).to.have.exactly(2).descendants('li')
})

test('it should handle requests change', ({ context: { data: { wrapper, flux } } }) => {
  flux.getActions('requests').start()
  expect(wrapper.find('.app--spinner')).to.have.className('active')

  flux.getActions('requests').stop()
  expect(wrapper.find('.app--spinner')).to.not.have.className('active')
})

test.cb('it should handle lang change', (t) => {
  const { context: { data: { wrapper, flux } } } = t

  const { node } = wrapper.find(Header.decoratedComponent)
  node.handleLocaleChange('fr')

  defer(() => {
    const { locales: [ locale ] } = flux.getStore('locale').getState()
    t.is(locale, 'fr')

    t.end()
  })
})

test.cb('it should handle logout user', (t) => {
  const { context: { data: { wrapper, flux } } } = t
  flux.getActions('session').login({ username: 'foo' })

  const { node } = wrapper.find(Header.decoratedComponent)
  node.handleLogout()

  defer(() => {
    const { session } = flux.getStore('session').getState()
    t.is(session, null)

    t.end()
  })
})
