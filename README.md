
# Dispatchable

Dispatchable reactive store, alternative to svelte stores




![Logo](https://raw.githubusercontent.com/ravid7000/svelte-dispatchable/master/public/dispatable-logo.svg)


## Installation

Install svelte-dispatchable with npm

```bash
npm install svelte-dispatchable
```

Install svelte-dispatchable with yarn

```bash
yarn add svelte-dispatchable
```
    
## Usage/Examples

```js
// counterStore.js

import { dispatchable } from 'svelte-dispatchable'

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
```

Import the store in svelte component
```svelte
<script>
  import { counter } from './counterStore';

  const increment = () => {
    counter.dispatch({ type: 'INCREMENT' });
  };

  const decrement = () => {
    counter.dispatch({ type: 'DECREMENT' });
  };

  const reset = () => {
    counter.dispatch({ type: 'RESET' });
  };
</script>

<div>
  <h1>Counter</h1>
  <p>
    <button name="increment" on:click={increment}>+</button>
    <span class="counter">{$counter}</span>
    <button name="decrement" on:click={decrement}>-</button>
    <button name="reset" on:click={reset}>reset</button>
  </p>
</div>

```

### The Store
Dispatchable takes initialState as first argument and reducer function as second argument.

```js

const reducer = (state, action) => {
  // handle state
  return state
}

const store = dispatchable(0 /* <initialState> */, reducer /* <reducerFn> */)
```

**Dispatch update to the store**

Dispatch method takes first argument as object { type: string }, `type` key is required

```js
store.dispatch({
  type: 'string',
})
```

**Dispatch update to the store with additional data**

```js
store.dispatch({
  type: 'string',
  value: 1,
  // ...other data
})
```

**Dispatch update with additional arguments**

```js
store.dispatch({ type: 'string' }, ...additionalArgs)
```


## FAQ

#### Why are the issue with svelte stores?

- Svelte allows to directly modify the store value from components which sometime becomes very hard to find which component is updating the store. Multiple updates on store from multiple places.
```
$counter = 10;
```

- It is not a scalable approach as your project grows it becomes difficult to manage the state.
- To solve these issue introducing dispatchable store.

#### Why not redux?

Redux is a very popular state management library mostly used with React framework. Redux mainly focus on creating a single store and adding reducers based on requirement. And redux also has so much boilerplate code to setup a reducer. Which defeats the purpose of writing multiple independent stores with very less boilerplate code in svelte.



## Authors

- [@ravid7000](https://www.github.com/ravid7000)


## License

[MIT](https://github.com/ravid7000/svelte-dispatchable/blob/master/LICENSE)


## Contributing

Contributions are always welcome!

See [`contributing.md`](https://github.com/ravid7000/svelte-dispatchable/blob/master/contributing.md) for ways to get started.

