const yasm = require('../index.js')

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
  const sub = jest.fn()
  store.subscribe(sub)
  store.setState({a: 1})

  expect(sub).toHaveBeenCalledTimes(1)
  expect(sub).toHaveBeenCalledWith({a: 1})
})

test('it publishes on state changes to a path', () => {
  const store = yasm({a: {b: 1}, c: 3})
  const sub1 = jest.fn()
  const sub2 = jest.fn()
  const sub3 = jest.fn()
  store.subscribe(sub1, 'c')
  store.subscribe(sub2, 'a.b')
  store.subscribe(sub3)
  store.setState(2, 'a.b')

  expect(sub1).toHaveBeenCalledTimes(0)
  expect(sub2).toHaveBeenCalledTimes(1)
  expect(sub2).toHaveBeenCalledWith({a: {b: 2}, c: 3})
  expect(sub3).toHaveBeenCalledTimes(1)
  expect(sub3).toHaveBeenCalledWith({a: {b: 2}, c: 3})
})