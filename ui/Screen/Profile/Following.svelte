<script lang="typescript">
  import { getContext } from "svelte";
  import { fade } from "svelte/transition";
  import { push } from "svelte-spa-router";

  import { FADE_DURATION } from "../../src/config";
  import * as modal from "../../src/modal";
  import * as path from "../../src/path";
  import { following as store, fetchFollowing } from "../../src/profile";
  import { cancelRequest } from "../../src/project";
  import type { Project } from "../../src/project";
  import type { UnsealedSession } from "../../src/session";
  import type { Urn } from "../../src/urn";

  import {
    EmptyState,
    Hoverable,
    List,
    ProjectList,
    Remote,
    RadicleId,
    FollowToggle,
  } from "../../DesignSystem/Component";

  const session: UnsealedSession = getContext("session");
  const onCancel = (urn: Urn): void => {
    cancelRequest(urn).then(fetchFollowing);
  };
  const onSelect = ({ detail: project }: { detail: Project }) => {
    push(path.project(project.urn));
  };

  fetchFollowing();
</script>

<style>
  .container {
    margin: 0 auto;
    max-width: var(--content-max-width);
    min-width: var(--content-min-width);
  }

  .header {
    display: flex;
    margin: 1.5rem 3rem 0.5rem;
  }

  .undiscovered-project {
    padding: 1.5rem;
    flex: 1;
    min-height: 6rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .undiscovered-project:hover {
    background-color: var(--color-background);
  }
</style>

<div class="container">
  <Remote {store} let:data>
    <ProjectList
      projects={data.follows}
      userUrn={session.identity.urn}
      on:select={onSelect} />

    {#if data.requests.length > 0}
      <div out:fade|local={{ duration: FADE_DURATION }}>
        <div class="header">
          <p class="typo-text-bold">Still looking…&nbsp;</p>
          <p style="color: var(--color-foreground-level-6);">
            These projects haven't been found in your network yet or don't
            exist.
          </p>
        </div>
        <List items={data.requests} let:item={request} key="urn">
          <Hoverable let:hovering={hover} style="flex: 1;">
            <div
              data-cy="undiscovered-project"
              class="undiscovered-project"
              out:fade|local={{ duration: FADE_DURATION }}>
              <RadicleId urn={request.urn} />
              {#if hover}
                <div transition:fade={{ duration: FADE_DURATION }}>
                  <FollowToggle
                    following
                    on:unfollow={() => onCancel(request.urn)} />
                </div>
              {/if}
            </div>
          </Hoverable>
        </List>
      </div>
    {/if}

    <div slot="empty">
      <EmptyState
        text="You're not following any projects yet."
        emoji="🐎"
        primaryActionText="Look for a project"
        on:primaryAction={() => {
          modal.toggle(path.search());
        }} />
    </div>
  </Remote>
</div>
