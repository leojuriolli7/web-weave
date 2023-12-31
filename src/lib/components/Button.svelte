<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Spinner from './Spinner.svelte';

	type Variant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'brand';
	type Size = 'small' | 'base' | 'large';

	export let full = false;
	export let disabled: boolean | undefined = undefined;
	export let loading: boolean | undefined = undefined;
	export let style: string | undefined = undefined;
	export let type: HTMLButtonAttributes['type'] = 'button';
	export let variant: Variant = 'primary';
	export let size: Size = 'base';
	export let tabindex: number | undefined = undefined;
	export let title: string | undefined = undefined;

	const spinnerColors: Record<Variant, string> = {
		brand: 'var(--white)',
		danger: 'var(--error-text)',
		primary: 'var(--black)',
		secondary: 'var(--white)',
		tertiary: 'var(--white)'
	};
</script>

<button
	{tabindex}
	class="{variant} {size}"
	{style}
	class:full
	class:loading
	on:click
	{disabled}
	{type}
	{title}
>
	{#if loading}
		<Spinner size={16} color={spinnerColors[variant]} />
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
		color: #f2cee6;
	}

	.primary {
		background: var(--white);
		color: var(--dark-gray);
	}

	.secondary {
		background: var(--medium-gray);
		color: var(--white);
	}

	.tertiary {
		background: var(--muted-gray);
		color: var(--white);
	}

	.danger {
		background: var(--error);
		color: var(--error-text);
	}
</style>
