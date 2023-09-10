<script lang="ts">
	import { prependHttps } from '$lib/utils/prependHttps';
	import { cubicInOut } from 'svelte/easing';
	import { colorsStore } from '$lib/stores/colors';
	import { slide } from 'svelte/transition';

	export let href: string;
	export let variant: 'small' | 'base' = 'base';
	export let style: string | null = null;
	export let ariaDescribedBy: string | null = null;
</script>

<a
	transition:slide={{ easing: cubicInOut, duration: 250 }}
	class="user-link"
	href={prependHttps(href)}
	target="_blank"
	rel="noopener"
	aria-describedby={ariaDescribedBy}
	style:color={$colorsStore.buttonTextColor}
>
	<div
		{style}
		style:background-color={$colorsStore.buttonsBackgroundColor}
		style:box-shadow="0 0 0 {$colorsStore.buttonBorderSize}
		{$colorsStore.buttonsBorderColor}"
		class="user-link-content {variant}"
	>
		<slot />
	</div>
</a>

<style lang="scss">
	.user-link {
		text-decoration: none;
		width: 100%;
		word-break: break-word;
	}

	.base {
		padding: 12px 44px;

		@media (max-width: 700px) {
			padding: 12px 24px;
		}
	}

	.small {
		padding: 6px 22px;

		font-size: 15px;
	}

	.user-link-content {
		width: 100%;
		border-radius: 25px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		transition: all cubic-bezier(0.19, 1, 0.22, 1) 300ms;

		&:hover {
			opacity: 0.8;
		}
	}
</style>
