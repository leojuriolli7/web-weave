<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import '../app.css';

	export let data;

	$: user = data.session.user;
</script>

<svelte:head>
	<title>Web Weave</title>
	<meta name="description" content="Streamline your online presence." />
</svelte:head>

<main>
	<header>
		{#if data.session.isLoggedIn === true}
			<div class="user-section">
				<img src={user?.avatar} alt="Your avatar" />

				<a href="/dashboard">Dashboard</a>
			</div>

			<form method="post" action="/logout" use:enhance>
				<Button type="submit" variant="secondary">Sign out</Button>
			</form>
		{:else}
			<a href="/login/github">Sign in with Github</a>
		{/if}
	</header>

	<slot />
</main>

<style lang="scss">
	main {
		max-width: 1920px;
		margin: 0 auto;
	}

	a {
		text-decoration: underline;
		color: var(--brand);
	}

	header {
		height: 64px;
		padding: 16px;
		border-bottom: 2px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: space-between;

		.user-section {
			display: flex;
			align-items: center;
			gap: 16px;
		}

		img {
			width: 32px;
			height: 32px;
			border-radius: 50%;
		}
	}
</style>
