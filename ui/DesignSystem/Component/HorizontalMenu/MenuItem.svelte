<script lang="typescript">
  import type { SvelteComponent } from "svelte";
  import { link } from "svelte-spa-router";

  export let href: string;
  export let icon: typeof SvelteComponent;
  export let title: string;
  export let active: boolean;
  export let counter: number | undefined;
</script>

<style>
  .icon {
    margin-right: 0.5rem;
    align-items: center;
    padding-top: 1px;
  }

  a {
    display: flex;
    align-items: center;
  }

  .item {
    line-height: 130%;
    color: var(--color-foreground-level-6);
  }

  .item.active {
    color: var(--color-secondary);
  }

  .counter {
    background-color: var(--color-foreground-level-2);
    color: var(--color-foreground-level-6);
    padding: 0.1875rem 0.5rem;
    border-radius: 0.75rem;
    margin-left: 0.5rem;
  }
</style>

<a data-cy={title} {href} use:link on:click>
  {#if active}
    <div class="icon">
      <svelte:component this={icon} style="fill: var(--color-secondary)" />
    </div>
  {:else}
    <div class="icon">
      <svelte:component this={icon} />
    </div>
  {/if}

  <p class="item typo-text-bold" class:active>{title}</p>
  {#if counter}
    <span class="counter typo-mono-bold" data-cy="counter">{counter}</span>
  {/if}
</a>

{#if active}
  <slot />
{/if}
