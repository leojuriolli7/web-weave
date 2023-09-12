<script lang="ts">
	import type { IconNames } from '$components/MediaIcon/MediaIcon.svelte';
	import { colorsStore } from '$lib/stores/colors';
	import SocialLink from '$components/SocialLink.svelte';
	import Link from '$components/Link.svelte';
	import type { User as UserType, Link as LinkType } from '$drizzle/schema';

	type SocialMediaLink = {
		name: IconNames;
		url: string;
	};

	type ExtraLink = Omit<LinkType, 'id'> & {
		id: string;
	};

	type Profile = UserType & {
		links: ExtraLink[];
	};

	export let profile: Profile;

	$: socialMediaLinks = [
		{ name: 'Instagram', url: profile.instagram },
		{ name: 'Facebook', url: profile.facebook },
		{ name: 'Twitter', url: profile.twitter },
		{ name: 'Linkedin', url: profile.linkedin },
		{ name: 'Youtube', url: profile.youtube },
		{ name: 'Twitch', url: profile.twitch },
		{ name: 'Telegram', url: profile.telegram },
		{ name: 'Tiktok', url: profile.tiktok }
	] as SocialMediaLink[];
</script>

<div
	class="phone"
	style:background={$colorsStore.gradient
		? `linear-gradient(${$colorsStore.gradientDegrees}deg, ${$colorsStore.gradientColors[0]}, ${$colorsStore.gradientColors[1]})`
		: $colorsStore.backgroundColor}
>
	<div class="notch" />
	<div class="volume-up" />
	<div class="volume-down" />
	<div class="power-button" />

	<div class="phone-preview">
		<img src={profile.avatar} alt="Your profile avatar" />

		<h3 id="profile-name" style:color={$colorsStore.usernameColor}>{profile.username}</h3>

		<p class="preview-description" style:color={$colorsStore.descriptionColor}>
			{profile.description}
		</p>

		<nav class="social-links">
			{#each socialMediaLinks as link}
				{#if link.url}
					<SocialLink name={profile.username} media={link.name} href={link.url} />
				{/if}
			{/each}
		</nav>

		<nav
			class="extra-links"
			style:gap="calc(2 * {$colorsStore.buttonBorderSize} + 12px)"
			style:margin-top="calc(2 * {$colorsStore.buttonBorderSize} + 16px)"
		>
			{#each profile.links as link (link.id)}
				{#if link.title}
					<Link
						style="background-color: var(--dark-gray)"
						variant="small"
						href={link.url}
						ariaDescribedBy="profile-name">{link.title}</Link
					>
				{/if}
			{/each}
		</nav>
	</div>
</div>

<style lang="scss">
	.phone {
		top: 32px;
		margin-top: 32px;
		position: sticky;
		height: 700px;
		width: 350px;
		border-radius: 2.5rem;
		border: 14px solid var(--night);
		box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

		@media (max-width: 975px) {
			width: 280px;
			height: 550px;
		}

		@media (max-width: 700px) {
			width: auto;
			height: 77dvh;
			aspect-ratio: 9/16;
			margin-top: 0px;
			max-width: min(335px, 85vw);
		}

		.notch {
			position: absolute;
			top: 0;
			background: var(--night);
			left: 50%;
			transform: translateX(-50%);
			width: 150px;
			height: 18px;
			border-bottom-left-radius: 16px;
			border-bottom-right-radius: 16px;
		}

		.power-button {
			position: absolute;
			background: var(--night);
			right: -17px;
			width: 14px;
			height: 60px;
			border-top-right-radius: 8px;
			border-top-left-radius: 8px;
			top: 170px;
		}

		.volume-up,
		.volume-down {
			position: absolute;
			background: var(--night);
			left: -17px;
			width: 14px;
			height: 48px;
			border-top-right-radius: 8px;
			border-top-left-radius: 8px;
		}

		.volume-down {
			top: 200px;
		}

		.volume-up {
			top: 140px;
		}

		.phone-preview {
			padding: 32px;
			display: flex;
			flex-direction: column;
			align-items: center;
			user-select: none;
			height: 100%;
			overflow-y: auto;

			-ms-overflow-style: none;
			scrollbar-width: none;

			&::-webkit-scrollbar {
				display: none;
			}

			img {
				border-radius: 50%;
				width: 64px;
				height: 64px;
				margin-top: 32px;
			}

			@media (max-width: 700px) {
				padding: 24px;
			}

			@media (max-width: 330px) {
				padding: 16px;
			}

			h3 {
				margin-top: 16px;
			}

			.preview-description {
				margin-top: 8px;
				font-size: 13px;
				word-break: break-word;
				line-height: 20px;
				text-align: center;
			}
		}
	}

	.social-links {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		align-items: center;
		justify-content: center;
		margin-top: 16px;
	}

	.extra-links {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
