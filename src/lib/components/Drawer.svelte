<script lang="ts">
	import { clickOutside } from '../utils/clickOutside';
	import { fly, type FlyParams } from 'svelte/transition';

	export let blockClickOutside: boolean = false;
	export let visible: boolean = false;
	export let position: 'fixed' | 'absolute' = 'fixed';
	export let width: string;
	export let backdrop: boolean = true;
	export let backgroundColor: string = 'var(--dark-gray)';
	export let transitionParams: FlyParams = {};
	export let placement: 'left' | 'right' | 'top' | 'bottom' = 'left';
	export let id: string;

	const handleDrawer = () => {
		visible = !visible;
	};

	$: if (typeof window !== 'undefined')
		document.documentElement.style.overflow = `${visible ? 'hidden' : 'auto'}`;

	function clickOutsideWrapper(node: HTMLElement, callback: () => void) {
		return blockClickOutside ? undefined : clickOutside(node, callback);
	}
</script>

{#if visible}
	{#if backdrop && !blockClickOutside}
		<div role="presentation" class="backdrop" on:click={() => visible && handleDrawer()} />
	{:else if backdrop && blockClickOutside}
		<div role="presentation" class="backdrop" />
	{/if}

	<div
		use:clickOutsideWrapper={() => visible && handleDrawer()}
		{id}
		{...$$restProps}
		class="drawer-content {placement} {position}"
		style:width
		style:background-color={backgroundColor}
		transition:fly={transitionParams}
		tabindex="-1"
		aria-controls={id}
		aria-labelledby={id}
	>
		<slot hidden={!visible} />
	</div>
{/if}

<style>
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 50;
		width: 100%;
		height: 100%;
		opacity: 90%;
		background: var(--black);
	}

	.left {
		bottom: 0px;
		top: 0px;
		left: 0px;
	}

	.right {
		bottom: 0px;
		top: 0px;
		right: 0px;
	}

	.top {
		left: 0px;
		right: 0px;
		top: 0px;
	}

	.bottom {
		left: 0px;
		right: 0px;
		bottom: 0px;
	}

	.fixed {
		position: fixed;
	}

	.absolute {
		position: absolute;
	}

	.drawer-content {
		overflow-y: auto;
		z-index: 50;
		padding: 16px;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
	}
</style>
