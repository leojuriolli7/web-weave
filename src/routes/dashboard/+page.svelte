<script>
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { Button, Field, Link } from '$components';

	export let data;
	let loading = false;
</script>

<div class="outer-container">
	<section class="created-container">
		<h2>Your created links</h2>

		{#each data.links as link (link.id)}
			<Link {link} />
		{/each}
	</section>

	<section class="create-link-container">
		<h2>Create a new link</h2>
		<form
			method="POST"
			action="?/createLink"
			use:enhance={() => {
				loading = true;

				return ({ update, result }) => {
					loading = false;
					update();

					if (result.type === 'success') {
						// update the links list
						invalidate('app:your-links');
					}
				};
			}}
		>
			<Field
				label="Your link URL"
				placeholder="Write a url..."
				name="url"
				style="margin-top: 16px"
			/>

			<Field
				label="Your link title"
				placeholder="Write a title..."
				name="title"
				style="margin-top: 16px"
			/>

			<Button {loading} full variant="brand" type="submit" style="margin-top: 16px"
				>Create new link</Button
			>
		</form>
	</section>
</div>

<style lang="scss">
	h2 {
		color: var(--silver);
		line-height: 32px;
		font-size: 24px;
		font-weight: 600;
	}

	.create-link-container {
		width: 300px;
		margin-top: 32px;
	}

	.outer-container {
		padding: 16px;
	}
</style>
