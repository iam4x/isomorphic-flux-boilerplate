import defer from 'lodash/defer'
import test from 'ava'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'

import Account from 'pages/account'

import mount from '../helpers/mount'

chai.use(chaiEnzyme())

test.beforeEach((t) => {
  const flux = mount(undefined, undefined, true)
  flux.getActions('session').login({ username: 'foo' })
  t.context.data = mount(Account, {}, flux)
})

test.afterEach((t) => t.context.data.wrapper.unmount())

test('it should display username', ({ context: { data: { wrapper } } }) => {
  expect(wrapper.find('h1')).to.have.text('Welcome, foo!')
})

test.cb('it should listen to username changes', (t) => {
  const { context: { data: { wrapper, flux } } } = t
  expect(wrapper.find('h1')).to.have.text('Welcome, foo!')

  flux.getActions('session').update({ username: 'bar' })

  defer(() => {
    expect(wrapper.find('h1')).to.have.text('Welcome, bar!')
    t.end()
  })
})
