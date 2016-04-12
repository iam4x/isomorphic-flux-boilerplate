import test from 'ava'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import mount from '../helpers/mount'

import ServerError from 'pages/server-error'

chai.use(chaiEnzyme())

test('it should render 500 message', () => {
  const { wrapper } = mount(ServerError)
  expect(wrapper.find('h1')).to.have.text('500')
})
