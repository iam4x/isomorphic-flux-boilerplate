import test from 'ava'
import React from 'react'

import mount from './helpers/mount'
import App from 'components/app'

import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme())

test.afterEach(({ context: { data } }) => data && data.wrapper.unmount())

test('it should listen for document title change', t => {
  const { flux } = mount(App)
  flux.getActions('helmet').update({ title: 'foobar', titleBase: '' })
  t.is(document.title, 'foobar')
})

test('it should render logo correctly', t => {
  t.context.data = mount(App)
  const { data: { wrapper } } = t.context
  expect(wrapper.find('.app--logo')).to.exist
})

test('it should render header correctly', t => {
  t.context.data = mount(App)
  const { data: { wrapper } } = t.context
  expect(wrapper.find('header')).to.exist
})

test('it should render children components', t => {
  t.context.data = mount(App, { children: <h1>foo</h1> })
  const { data: { wrapper } } = t.context
  expect(wrapper.find('h1')).to.exist
  expect(wrapper.find('h1')).to.have.text('foo')
})
