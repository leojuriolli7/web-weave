<script lang="ts">
	import { prependHttps } from '$lib/utils/prependHttps';
	import { cubicInOut } from 'svelte/easing';
	import { colorsStore } from '$lib/stores/colors';
	import { slide } from 'svelte/transition';
	import { icons } from './SelectIcons/icons';

	export let href: string;
	export let variant: 'small' | 'base' = 'base';
	export let icon: string | null = null;
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
	style:font-weight={$colorsStore.buttonFontWeight}
>
	<div
		{style}
		style:background-color={$colorsStore.buttonsBackgroundColor}
		style:box-shadow="0 0 0 {$colorsStore.buttonBorderSize}
		{$colorsStore.buttonsBorderColor}"
		class="user-link-content {variant}"
	>
		{#if icon}
			<div class="icon">
				<svelte:component
					this={icons?.find((value) => value.name === icon)?.component}
					class="icon-{variant}"
				/>
			</div>
		{/if}

		<slot />
	</div>
</a>

<style lang="scss">
	.user-link {
		text-decoration: none;
		width: 100%;
		word-break: break-word;
	}

	.icon {
		position: absolute;
		left: 12px;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
	}

	:global(.icon-small) {
		width: 18px;
		height: 18px;
	}

	:global(.icon-base) {
		width: 24px;
		height: 24px;
	}

	.base {
		padding: 12px 44px;
	}

	.small {
		padding: 6px 50px;

		font-size: 15px;
	}

	.user-link-content {
		width: 100%;
		border-radius: 25px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		gap: 6px;
		transition: all cubic-bezier(0.19, 1, 0.22, 1) 300ms;

		&:hover {
			opacity: 0.8;
		}
	}
</style>
