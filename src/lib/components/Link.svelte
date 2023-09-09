<script lang="ts">
	import { prependHttps } from '$lib/utils/prependHttps';
	import { cubicInOut } from 'svelte/easing';
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
>
	<div {style} class="user-link-content {variant}">
		<slot />
	</div>
</a>

<style lang="scss">
	.user-link {
		color: var(--white);
		text-decoration: none;
		width: 100%;
		word-break: break-word;
	}

	.base {
		padding: 12px 44px;

		@media (max-width: 650px) {
			padding: 12px 24px;
		}
	}

	.small {
		padding: 6px 22px;

		font-size: 15px;
	}

	.user-link-content {
		width: 100%;
		background: var(--medium-gray);
		border-radius: 25px;
		border: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		transition: all cubic-bezier(0.19, 1, 0.22, 1) 300ms;

		&:hover {
			border-color: var(--brand-muted);
			box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		}
	}
</style>
