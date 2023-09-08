<script lang="ts">
	import Link from '$components/Link.svelte';
	import type { IconNames } from '$components/MediaIcon/MediaIcon.svelte';
	import SocialLink from '$components/SocialLink.svelte';

	type LinkType = {
		name: IconNames;
		url: string;
	};

	export let data;
	let { user } = data;

	$: socialMediaLinks = [
		{ name: 'Instagram', url: user.instagram },
		{ name: 'Facebook', url: user.facebook },
		{ name: 'Twitter', url: user.twitter },
		{ name: 'Linkedin', url: user.linkedin },
		{ name: 'Youtube', url: user.youtube },
		{ name: 'Twitch', url: user.twitch },
		{ name: 'Telegram', url: user.telegram },
		{ name: 'Tiktok', url: user.tiktok }
	] as LinkType[];
</script>

<div class="user-container">
	<div class="user-header">
		<img class="avatar" src={user.avatar} alt="{user.avatar} avatar" />
		<h1>{user.username}</h1>
	</div>

	<nav class="social-links">
		{#each socialMediaLinks as link}
			{#if link.url}
				<SocialLink iconSize={28} media={link.name} href={link.url} />
			{/if}
		{/each}
	</nav>

	<nav class="extra-links">
		{#each user.links as link (link.id)}
			<Link href={link.url}>
				{link.title}
			</Link>
		{/each}
	</nav>
</div>

<style lang="scss">
	.user-container {
		margin: 0 auto;
		margin-top: 32px;
		height: 100%;
		width: 100%;
		max-width: 680px;
	}

	.user-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;

		h1 {
			font-size: 20px;
			color: var(--white);
		}
	}

	.avatar {
		width: 96px;
		height: 96px;
		border-radius: 50%;
	}

	.social-links {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		align-items: center;
		justify-content: center;
		margin-top: 22px;
	}

	.extra-links {
		display: flex;
		flex-direction: column;
		gap: 12px;
		width: 100%;
		margin-top: 22px;
	}
</style>
