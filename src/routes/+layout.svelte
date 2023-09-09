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
			<div class="user-section">
				<a href="/{user?.username}">
					<img src={user?.avatar} alt="Your avatar" />
				</a>

				<a href="/dashboard">
					<Button variant="brand">Dashboard</Button>
				</a>
				<form method="post" action="/logout" use:enhance>
					<Button type="submit" variant="brand">Sign out</Button>
				</form>
			</div>
		{:else}
			<a href="/login/github">
				<Button variant="brand">Sign in with Github</Button>
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

		@media (max-width: 650px) {
			display: none;
		}
	}

	header {
		height: 64px;
		padding: 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.user-section {
			display: flex;
			align-items: center;
			gap: 8px;
		}

		img {
			width: 32px;
			height: 32px;
			border-radius: 50%;
		}
	}
</style>
