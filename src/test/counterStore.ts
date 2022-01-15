import { dispatchable } from '../dispatchable'

export const counter = dispatchable(0, (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
})