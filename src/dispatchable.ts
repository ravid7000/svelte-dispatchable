type Action = {
  type: string,
  [extraProps: string]: any
}

type ActionAny<T> = Action | {
  (currentState: T, ...extraArgs: any[]): Action
}

type Reducer<T> = {
  (state: T, action: Action, ...extraArgs: any[]): T
}

type Listener<T> = (value: T) => void

type Dispatchable<T = any> = {
  dispatch: (action: ActionAny<T>, ...extraArgs: any[]) => void;
  subscribe: (listener: Listener<T>) => () => void;
}

/**
 * Create dispatchable store
 * 
 * @example
 * // create store
 * const counter = dispatchable(0, (state, action) => {
 *  switch (action.type) {
 *   case 'INCREMENT':
 *    return state + 1
 *  case 'DECREMENT':
 *   return state - 1
 * default:
 *  return state
 * }
 * 
 * // usage
 * counter.subscribe()
 * counter.dispatch({ type: 'INCREMENT' })
 * 
 * @param initialState Any
 * @param reducer Reducer Function
 * @returns Dispatchable
 */
function dispatchable<T = any>(initialState: T, reducer: Reducer<T>) {
  let currentState = initialState;
  let listeners: Listener<T>[] = [];

  function dispatch(action: ActionAny<T>, ...extraArgs: any[]) {
    if (typeof action === 'function') {
      action = action(currentState, ...extraArgs);
    }

    if (typeof reducer === 'function') {
      let newState = reducer(currentState, action, ...extraArgs);

      if (newState !== currentState) {
        currentState = newState
        listeners.forEach(listener => listener(currentState))
      }
    }
  }

  function subscribe(listener: Listener<T>) {
    if (typeof listener !== 'function') {
      throw new Error('listener must be a function')
    }
    listeners.push(listener);
    listener(currentState);
    return function unsubscribe() {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  return {
    dispatch,
    subscribe,
  }
}

export type { Dispatchable, Action, ActionAny, Reducer, Listener }
export { dispatchable }