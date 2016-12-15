import test from 'ava'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'

import NotFound from 'pages/not-found'

import mount from '../helpers/mount'

chai.use(chaiEnzyme())

test('it should render 404 message', () => {
  const { wrapper } = mount(NotFound)
  expect(wrapper.find('h1')).to.have.text('404')
})
