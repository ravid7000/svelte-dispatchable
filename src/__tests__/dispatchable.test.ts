import { get } from 'svelte/store'
import { dispatchable } from '../dispatchable';

describe('Breaking Dispatchable', () => {
  test('Should throw error if subscriber is not a function', () => {
    const listener: any = 1;

    const counter = dispatchable(0, (state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1
        case 'DECREMENT':
          return state - 1
        default:
          return state
      }
    })

    expect(() => counter.subscribe(listener)).toThrowError('listener must be a function')
  })
})
describe('Running Dispatchable', () => {
  test('Should have dispatch & subscribe apis', () => {
    const counter = dispatchable(0, (state) => state)
    expect(counter).toBeInstanceOf(Object);
    expect(counter).toHaveProperty('dispatch');
    expect(counter).toHaveProperty('subscribe');
    expect(counter.subscribe).toBeInstanceOf(Function);
    expect(counter.dispatch).toBeInstanceOf(Function);
  })
  test('Should dispatch action to call reducer', () => {
    const counter = dispatchable(0, (state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1
        case 'DECREMENT':
          return state - 1
        default:
          return state
      }
    })

    counter.dispatch({ type: 'INCREMENT' })
    expect(get(counter)).toBe(1)
    counter.dispatch({ type: 'DECREMENT' })
    expect(get(counter)).toBe(0)
    counter.dispatch({ type: 'RANDOM' })
    expect(get(counter)).toBe(0)
    counter.dispatch((state) => {
      return {
        type: 'INCREMENT',
        value: state + 1,
      }
    })
    expect(get(counter)).toBe(1)
  })
  test('Should subscribe to the store', () => {
    const counter = dispatchable(0, (state, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1
        case 'DECREMENT':
          return state - 1
        default:
          return state
      }
    })

    let value = 0
    const unsubscribe = counter.subscribe(v => value = v)
    counter.dispatch({ type: 'INCREMENT' })
    expect(value).toBe(1)
    counter.dispatch({ type: 'DECREMENT' })
    expect(value).toBe(0)
    unsubscribe()
    counter.dispatch({ type: 'INCREMENT' })
    expect(value).toBe(0)
  })
})
