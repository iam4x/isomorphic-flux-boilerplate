/* eslint max-len: 0 */
import defer from 'lodash/defer'

import test from 'ava'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import fauxJax from 'faux-jax'

import Profile from 'components/profile'
import mount from './helpers/mount'

chai.use(chaiEnzyme())

const exampleUser = '{"email":"clara.coleman83@example.com","name":{"title":"ms","first":"clara","last":"coleman"},"seed":"7729a1ef4ba6ef68","picture":{"large":"http://api.randomuser.me/portraits/women/72.jpg","medium":"http://api.randomuser.me/portraits/med/women/72.jpg","thumbnail":"http://api.randomuser.me/portraits/thumb/women/72.jpg"}}'

let testCount = 0
test.beforeEach.cb((t) => {
  const error = ++testCount >= 3

  const respond = (request) => {
    const responseCode = error ? 500 : 200

    const responseBody = error ? '{ "error": "foobar" }' : exampleUser

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

  // get only flux instance to initialize component with flux store
  // before rendering happens
  const flux = mount(undefined, {}, true)
  if (testCount === 2) flux.getActions('users').indexSuccess([ JSON.parse(exampleUser) ])
  t.context.data = mount(Profile, { params: { seed: '7729a1ef4ba6ef68' } }, flux)
})

test.afterEach((t) => t.context.data.wrapper.unmount())

test.serial('it should render username after request', (t) => {
  const { wrapper } = t.context.data
  expect(wrapper.find('h2')).to.have.text('Clara Coleman')
})

test.serial('it should render picture after request', (t) => {
  const { wrapper } = t.context.data
  expect(wrapper.find('img')).to.have.attr(
    'src',
    'http://api.randomuser.me/portraits/med/women/72.jpg'
  )
})

test.serial('it should handle errors', (t) => {
  const { flux } = t.context.data
  const { error } = flux.getStore('users').getState()
  t.is(error.error, 'foobar')
})
