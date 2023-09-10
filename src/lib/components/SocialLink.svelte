<script lang="ts">
	import { prependHttps } from '$lib/utils/prependHttps';
	import { slide } from 'svelte/transition';
	import { colorsStore } from '$lib/stores/colors';
	import { cubicInOut } from 'svelte/easing';
	import MediaIcon, { type IconNames } from '$components/MediaIcon/MediaIcon.svelte';

	export let href: string;
	export let name: string | null = null;
	export let media: IconNames;
	export let iconSize: number = 24;
</script>

<a
	transition:slide={{ easing: cubicInOut }}
	href={prependHttps(href)}
	target="_blank"
	rel="noopener"
	aria-label="@{name} {media}"
>
	<MediaIcon size={iconSize} {media} color={$colorsStore.iconsColor} />
</a>
