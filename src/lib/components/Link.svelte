<script lang="ts">
	import type { Link } from '$drizzle/schema';

	export let link: Link;
	export let loading = false;
	export let showLink = true;
</script>

<div class:loading class="user-link-content">
	{#if showLink}
		<a class="user-link" href={link.url}>
			{link.title}
		</a>
	{:else}
		<slot name="alternate" />
	{/if}

	{#if $$slots.right}
		<div class="right-container">
			<slot name="right" />
		</div>
	{/if}
</div>

<style lang="scss">
	.user-link {
		color: var(--white);
		text-decoration: none;
		width: 100%;
	}

	.user-link-content {
		width: 100%;
		padding: 12px 44px;
		background: var(--medium-gray);
		border-radius: 25px;
		border: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;

		@media (max-width: 650px) {
			padding: 12px 24px;
		}

		&.loading {
			opacity: 50%;
		}

		&:hover {
			box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		}
	}
</style>
