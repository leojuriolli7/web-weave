<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Popover } from '$components';

	export let data;

	$: user = data.session.user;
</script>

<div class="outer">
	<header>
		<a href="/" class="logo">Web Weave</a>

		{#if data.session.isLoggedIn === true}
			<Popover width="150px">
				<button type="button" slot="trigger">
					<img class="user-avatar" src={user?.avatar} alt="Your avatar" />
				</button>

				<svelte:fragment slot="content">
					<a href="/{user?.username}">
						<Button tabindex={-1} full variant="brand">Your profile</Button>
					</a>
					<a href="/dashboard">
						<Button full tabindex={-1} variant="brand">Dashboard</Button>
					</a>
					<form method="post" action="/logout" use:enhance>
						<Button full type="submit" variant="brand">Sign out</Button>
					</form>
				</svelte:fragment>
			</Popover>
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
		color: var(--brand-muted);
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

	button {
		background: none;
		border: none;
	}
</style>
