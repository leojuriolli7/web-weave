<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import '../app.scss';

	export let data;

	$: user = data.session.user;
</script>

<svelte:head>
	<title>Web Weave</title>
	<meta name="description" content="Streamline your online presence." />
</svelte:head>

<div class="outer">
	<header>
		<a href="/" class="logo">Web Weave</a>

		{#if data.session.isLoggedIn === true}
			<div aria-haspopup="true" class="user-dropdown__container">
				<button type="button">
					<img class="user-avatar" src={user?.avatar} alt="Your avatar" />
				</button>

				<div class="user-dropdown__content" aria-label="submenu">
					<a href="/{user?.username}">
						<Button tabindex={-1} full variant="brand">Your profile</Button>
					</a>
					<a href="/dashboard">
						<Button full tabindex={-1} variant="brand">Dashboard</Button>
					</a>
					<form method="post" action="/logout" use:enhance>
						<Button full type="submit" variant="brand">Sign out</Button>
					</form>
				</div>
			</div>
		{:else}
			<a href="/login/github">
				<Button tabindex={-1} variant="brand">Sign in with Github</Button>
			</a>
		{/if}
	</header>

	<slot />
</div>

<style lang="scss">
	div.outer {
		max-width: 1920px;
		margin: 0 auto;
	}

	a {
		text-decoration: none;
	}

	.logo {
		font-size: 24px;
		font-weight: 700;
		letter-spacing: -0.02em;
		color: var(--brand);
	}

	header {
		height: 64px;
		padding: 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		z-index: 2;

		img.user-avatar {
			cursor: pointer;
			width: 36px;
			height: 36px;
			border-radius: 50%;
		}
	}

	.user-dropdown__container {
		position: relative;

		button {
			background: none;
			border: none;
		}

		&:hover,
		&:focus-within {
			.user-dropdown__content {
				opacity: 1;
				visibility: visible;
				transform: translateY(33px);
			}
		}
	}

	.user-dropdown__content {
		position: absolute;
		z-index: 2;
		transition: 280ms all 120ms cubic-bezier(0.215, 0.61, 0.355, 1);
		top: 6px;
		background: var(--medium-gray);
		box-shadow: 0 0.5em 0.75em rgba(black, 0.25);
		border-radius: 12px;
		padding: 16px;
		display: flex;
		right: 0;
		flex-direction: column;
		gap: 12px;
		width: 150px;
		opacity: 0;
		visibility: hidden;
	}
</style>
