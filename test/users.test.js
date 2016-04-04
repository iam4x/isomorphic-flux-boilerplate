/* eslint max-len: 0 */
import defer from 'lodash/defer'

import test from 'ava'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import fauxJax from 'faux-jax'

import Users from 'components/users'
import mount from './helpers/mount'

chai.use(chaiEnzyme())

test.beforeEach.cb(t => {
  const respond = (request) => {
    request.respond(
      200,
      { 'Content-Type': 'application/json' },
      '[{"email":"clara.coleman83@example.com","name":{"title":"ms","first":"clara","last":"coleman"},"seed":"7729a1ef4ba6ef68","picture":{"large":"http://api.randomuser.me/portraits/women/72.jpg","medium":"http://api.randomuser.me/portraits/med/women/72.jpg","thumbnail":"http://api.randomuser.me/portraits/thumb/women/72.jpg"}}]'
    )
    fauxJax.restore()
    defer(t.end)
  }

  fauxJax.install()
  fauxJax.on('request', respond)
  t.context = mount(Users)
})

test.serial('it should render users after request', t => {
  const { wrapper } = t.context
  expect(wrapper).to.have.exactly(1).descendants('.user--row')
})

test.serial('it should remove an user', t => {
  const { wrapper } = t.context
  wrapper.find('.user--remove').first().simulate('click')
  expect(wrapper).to.not.have.descendants('.user--row')
})
