<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Spinner from './Spinner.svelte';

	type Variant = 'primary' | 'secondary' | 'danger' | 'brand';
	type Size = 'small' | 'base' | 'large';

	export let full = false;
	export let disabled: boolean | undefined = undefined;
	export let loading: boolean | undefined = undefined;
	export let style: string | undefined = undefined;

	export let type: HTMLButtonAttributes['type'] = 'button';
	export let variant: Variant = 'primary';
	export let size: Size = 'base';
</script>

<button class="{variant} {size}" {style} class:full class:loading on:click {disabled} {type}>
	{#if loading}
		<Spinner size={16} />
	{/if}

	<slot />
</button>

<style lang="scss">
	button {
		border: 1px solid transparent;
		border-radius: 0.25rem;
		cursor: pointer;
		display: flex;
		gap: 6px;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
		font-weight: 400;
		line-height: 1.5;
		padding: 0.375rem 0.75rem;
		transition: all 300ms cubic-bezier(0.075, 0.82, 0.165, 1);

		&:hover {
			opacity: 0.8;
		}

		&:disabled {
			opacity: 0.3;
			cursor: not-allowed;
		}

		&.loading {
			opacity: 0.3;
			cursor: progress;
		}
	}

	.full {
		width: 100%;
	}

	/* Sizes */
	.small {
		padding: 2px 8px;
		font-size: 15px;
	}

	.base {
		padding: 4px 10px;
	}

	.large {
		padding: 8px 16px;
	}

	/* Variants */
	.brand {
		background: var(--brand);
		color: var(--white);
	}

	.primary {
		background: var(--white);
		color: var(--dark-gray);
	}

	.secondary {
		background: var(--medium-gray);
		color: var(--white);
	}

	.danger {
		background: var(--error);
		color: #fecaca;
	}
</style>
