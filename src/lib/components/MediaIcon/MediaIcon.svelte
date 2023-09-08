<script context="module" lang="ts">
	import Tiktok from './Tiktok.svelte';
	import {
		Facebook,
		Instagram,
		Linkedin,
		Twitch,
		Twitter,
		Youtube,
		Send as Telegram
	} from 'lucide-svelte';

	const IconElements = {
		Facebook,
		Instagram,
		Linkedin,
		Twitch,
		Twitter,
		Youtube,
		Telegram,
		Tiktok
	};

	export type IconNames = keyof typeof IconElements;
</script>

<script lang="ts">
	export let media: IconNames;
	export let color: string = 'currentColor';
	export let size: number = 24;
</script>

<svelte:component this={IconElements[media]} {color} {size} />
