<script lang="ts">
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

