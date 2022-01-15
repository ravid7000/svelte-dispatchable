export type Action = {
  type: string,
  [extraProps: string]: any
}

export type ActionAny<T> = Action | {
  (currentState: T, ...extraArgs: any[]): Action
}

export type Reducer<T> = {
  (state: T, action: Action, ...extraArgs: any[]): T
}

export type Listener<T> = (value: T) => void

export type Dispatchable<T = any> = {
  dispatch: (action: ActionAny<T>, ...extraArgs: any[]) => void;
  subscribe: (listener: Listener<T>) => () => void;
}

export function dispatchable<T = any>(initialState: T, reducer: Reducer<T>) {
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