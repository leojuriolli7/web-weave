<script lang="ts">
	import type { IconNames } from '$components/MediaIcon/MediaIcon.svelte';
	import { SocialLink, Link, MetaTags } from '$components';
	import { colorsStore, getColorsFromUser } from '$lib/stores/colors';

	type LinkType = {
		name: IconNames;
		url: string;
	};

	export let data;
	let { user } = data;

	$: $colorsStore = getColorsFromUser(user);

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

<MetaTags
	title="Web Weave | {user.username}"
	description={user.description || `${user.username}'s profile`}
	image={user.avatar}
	color={user.gradient ? user.firstGradientColor : user.backgroundColor}
/>

<div
	class="bg"
	style:background={$colorsStore.gradient
		? `linear-gradient(${$colorsStore.gradientDegrees}deg, ${$colorsStore.gradientColors[0]}, ${$colorsStore.gradientColors[1]})`
		: $colorsStore.backgroundColor}
/>
<div class="user-container">
	<div class="user-header">
		<img class="avatar" src={user.avatar} alt="{user.avatar} avatar" />
		<h1 style:color={$colorsStore.usernameColor} id="profile-name">{user.username}</h1>

		<p style:color={$colorsStore.descriptionColor}>{user.description}</p>
	</div>

	<nav class="social-links">
		{#each socialMediaLinks as link}
			{#if link.url}
				<SocialLink name={user.username} iconSize={28} media={link.name} href={link.url} />
			{/if}
		{/each}
	</nav>

	<nav
		class="extra-links"
		style:gap="calc(2 * {$colorsStore.buttonBorderSize} + 12px)"
		style:margin-top="calc(2 * {$colorsStore.buttonBorderSize} + 22px)"
	>
		{#each user.links as link (link.id)}
			<Link icon={link.image} href={link.url} ariaDescribedBy="profile-name">
				{link.title}
			</Link>
		{/each}
	</nav>
</div>

<style lang="scss">
	div.bg {
		width: 100vw;
		height: 100%;
		position: fixed;
		top: 0;
		right: 0;
		z-index: 1;
	}
	.user-container {
		margin: 0 auto;
		height: 100%;
		width: 100%;
		max-width: 680px;
		padding: 48px 16px 16px 16px;
		position: relative;
		z-index: 2;

		@media (max-width: 700px) {
			padding: 24px;
			padding-top: 48px;
		}

		@media (max-width: 330px) {
			padding: 16px;
			padding-top: 48px;
		}
	}

	.user-header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;

		h1 {
			font-size: 20px;
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
		width: 100%;
	}
</style>
