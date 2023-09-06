<script lang="ts">
	import type { Link } from '$drizzle/schema';

	export let link: Link;
</script>

<a class="user-link" href={link.url}>
	<div class="user-link-content">
		<p>{link.title}</p>
	</div>
</a>

<style>
	.user-link {
		color: var(--white);
		text-decoration: none;
	}

	.user-link-content {
		width: 100%;
		padding: 12px 44px;
		background: var(--medium-gray);
		border-radius: 25px;
		border: 1px solid var(--border);

		&:hover {
			box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		}

		&:first-child {
			margin-top: 16px;
		}

		&:not(:last-child) {
			margin-bottom: 16px;
		}
	}
</style>
