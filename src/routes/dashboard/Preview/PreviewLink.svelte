<script lang="ts">
	import { prependHttps } from '$lib/utils/prependHttps';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import MediaIcon, { type IconNames } from '$components/MediaIcon/MediaIcon.svelte';

	export let href: string;
	export let media: IconNames;
</script>

<a transition:slide={{ easing: cubicInOut }} href={prependHttps(href)} target="_blank">
	<MediaIcon {media} color="var(--brand-muted)" />
</a>
