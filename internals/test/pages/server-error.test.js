import test from 'ava'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'

import ServerError from 'pages/server-error'

import mount from '../helpers/mount'

chai.use(chaiEnzyme())

test('it should render 500 message', () => {
  const { wrapper } = mount(ServerError)
  expect(wrapper.find('h1')).to.have.text('500')
})
