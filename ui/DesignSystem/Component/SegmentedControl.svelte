<script lang="typescript">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  interface Option {
    value: string;
    title: string;
  }

  // Currently active option.
  export let active: string;
  // The available options.
  export let options: Option[];

  const onClick = (option: Option) => {
    dispatch("select", option.value);
    currentlyActive = option.value;
  };

  $: currentlyActive = active;
</script>

<style>
  .segmented-control {
    display: flex;
  }
  .segmented-control:hover button.active:not(:hover) {
    background: none;
  }
  .segmented-control button {
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 4px;
    margin: 0;
    background-color: var(--color-background);
    color: var(--color-foreground-level-6);
  }
  .segmented-control button:focus {
    outline: none;
  }
  .segmented-control button.active {
    background-color: var(--color-foreground-level-1);
    color: var(--color-secondary);
  }
  .segmented-control button:hover {
    background-color: var(--color-foreground-level-1);
  }
  .segmented-control button:active {
    background-color: var(--color-foreground-level-1);
    color: var(--color-secondary-level-2);
  }
</style>

<div class="segmented-control">
  {#each options as option}
    <button
      class="typo-semi-bold"
      class:active={option.value === currentlyActive}
      value={option.value}
      on:click={() => onClick(option)}>
      {option.title}
    </button>
  {/each}
</div>
