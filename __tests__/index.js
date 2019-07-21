const {test, expect, spy} = require('../lib/jest')
const yasm = require('../index.js')
// const yasm = require('../dist/index.min.js')

test('it can set state', () => {
  const store = yasm()
  const state = {a: {b: 1}}
  store.setState(state)
  expect(store.getState()).toEqual(state)
})

test('it can set state to a path', () => {
  const store = yasm()
  const state = {a: {b: 1}}
  store.setState(state)
  store.setState(2, 'a.b')
  expect(store.getState()).toEqual({a: {b: 2}})
})

test('it publishes on state changes', () => {
  const store = yasm()
  const sub = spy()
  store.subscribe(sub)
  store.setState({a: 1})

  expect(sub.__mock.calls).toBe(1)
  expect(sub.__mock.args).toEqual({a: 1})
})

test('it publishes on state changes to a path', () => {
  const store = yasm({a: {b: 1}, c: 3})
  const sub1 = spy()
  const sub2 = spy()
  const sub3 = spy()
  store.subscribe(sub1, 'c')
  store.subscribe(sub2, 'a.b')
  store.subscribe(sub3)
  store.setState(2, 'a.b')

  expect(sub1.__mock.calls).toBe(0)
  expect(sub2.__mock.calls).toBe(1)
  expect(sub2.__mock.args).toEqual({a: {b: 2}, c: 3})
  expect(sub3.__mock.calls).toBe(1)
  expect(sub3.__mock.args).toEqual({a: {b: 2}, c: 3})
})