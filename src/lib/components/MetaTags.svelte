<script lang="ts">
	import { page } from '$app/stores';

	export let title: string;
	export let description: string;
	export let image: string | null | undefined = undefined;

	$: resolvedImage = image || 'https://web-weave.vercel.app/og.png';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />

	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={resolvedImage} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={$page.url.href} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={resolvedImage} />
</svelte:head>
