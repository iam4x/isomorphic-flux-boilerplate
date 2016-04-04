/* eslint max-len: 0 */
import defer from 'lodash/defer'

import test from 'ava'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import fauxJax from 'faux-jax'

import Profile from 'components/profile'
import mount from './helpers/mount'

chai.use(chaiEnzyme())

test.beforeEach.cb(t => {
  const respond = (request) => {
    request.respond(
      200,
      { 'Content-Type': 'application/json' },
      '{"email":"clara.coleman83@example.com","name":{"title":"ms","first":"clara","last":"coleman"},"seed":"7729a1ef4ba6ef68","picture":{"large":"http://api.randomuser.me/portraits/women/72.jpg","medium":"http://api.randomuser.me/portraits/med/women/72.jpg","thumbnail":"http://api.randomuser.me/portraits/thumb/women/72.jpg"}}'
    )
    fauxJax.restore()
    defer(t.end)
  }

  fauxJax.install()
  fauxJax.on('request', respond)
  t.context = mount(Profile, { params: { seed: '7729a1ef4ba6ef68' } })
})

test.serial('it should render username after request', t => {
  const { wrapper } = t.context
  expect(wrapper.find('h2')).to.have.text('Clara Coleman')
})

test.serial('it should render picture after request', t => {
  const { wrapper } = t.context
  expect(wrapper.find('img')).to.have.attr(
    'src',
    'http://api.randomuser.me/portraits/med/women/72.jpg'
  )
})
