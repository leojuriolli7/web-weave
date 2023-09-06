<script lang="ts">
	import Link from '$components/Link.svelte';

	export let data;
	let { user } = data;
</script>

<div class="user-container">
	<div class="user-header">
		<img class="avatar" src={user.avatar} alt="{user.avatar} avatar" />
		<h1>{user.username}</h1>
	</div>

	<nav>
		{#each user.links as link (link.id)}
			<Link {link} />
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

	nav {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-top: 16px;
	}
</style>
