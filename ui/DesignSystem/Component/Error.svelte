<script lang="ts">
  import { Icon } from "../../DesignSystem/Primitive";

  export let message = "Something went wrong";
</script>

<style>
  .error {
    color: white;
    background-color: var(--color-negative-level-2);
    vertical-align: middle;
    margin: 1rem;
    padding: 1rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: left;
  }
  .error p {
    padding-left: 0.5rem;
  }
</style>

<div class="error">
  <Icon.ExclamationCircle style="fill: white" />
  <p>Error: {message}</p>
</div>
