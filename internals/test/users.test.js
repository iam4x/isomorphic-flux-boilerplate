/* eslint max-len: 0 */
import defer from 'lodash/defer'

import test from 'ava'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import fauxJax from 'faux-jax'

import Users from 'components/users'
import mount from './helpers/mount'

chai.use(chaiEnzyme())

let testCount = 0
test.beforeEach.cb((t) => {
  const error = ++testCount >= 3
  const responseCode = error ? 500 : 200
  const responseBody = error ?
    '{ "error": "foobar" }' :
    '[{"email":"clara.coleman83@example.com","name":{"title":"ms","first":"clara","last":"coleman"},"seed":"7729a1ef4ba6ef68","picture":{"large":"http://api.randomuser.me/portraits/women/72.jpg","medium":"http://api.randomuser.me/portraits/med/women/72.jpg","thumbnail":"http://api.randomuser.me/portraits/thumb/women/72.jpg"}}]'

  const respond = (request) => {
    request.respond(
      responseCode,
      { 'Content-Type': 'application/json' },
      responseBody
    )
    fauxJax.restore()

    defer(t.end)
  }

  fauxJax.install()
  fauxJax.on('request', respond)
  t.context.data = mount(Users)
})

test.afterEach((t) => t.context.data.wrapper.unmount())

test.serial('it should render users after request', (t) => {
  const { wrapper } = t.context.data
  expect(wrapper).to.have.exactly(1).descendants('.user--row')
})

test.serial('it should remove an user', (t) => {
  const { wrapper } = t.context.data
  wrapper.find('.user--remove').first().simulate('click')
  expect(wrapper).to.not.have.descendants('.user--row')
})

test.serial('it should handle errors', (t) => {
  const { flux } = t.context.data
  const { error } = flux.getStore('users').getState()
  t.is(error.error, 'foobar')
})
