<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { Button, Field, Link } from '$components';
	import { Trash2 } from 'lucide-svelte';

	export let data;
	let creatingLink = false;
	let deletingLinks: number[] = [];
</script>

<div class="outer-container">
	<section class="created-container">
		<h2>Your created links</h2>

		<nav>
			{#each data.links as link (link.id)}
				<Link loading={deletingLinks?.some((value) => value === link.id)} {link}>
					<div class="link-actions" slot="right">
						<form
							method="POST"
							action="?/deleteLink"
							title="Delete this link"
							use:enhance={() => {
								deletingLinks = [...deletingLinks, link.id];

								return ({ update, result }) => {
									update();

									deletingLinks = deletingLinks?.filter((val) => val !== link.id);

									if (result.type === 'success') {
										// update the links list
										invalidate('app:your-links');
									}
								};
							}}
						>
							<input name="id" value={link.id} style:display="none" style:visibility="hidden" />
							<button type="submit">
								<Trash2 style="cursor:pointer" size={21} color="var(--white)" />
							</button>
						</form>
					</div>
				</Link>
			{/each}
		</nav>
	</section>

	<section class="create-link-container">
		<h2>Create a new link</h2>
		<form
			method="POST"
			action="?/createLink"
			use:enhance={() => {
				creatingLink = true;

				return ({ update, result }) => {
					creatingLink = false;
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

			<Button loading={creatingLink} full variant="brand" type="submit" style="margin-top: 16px"
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

	.link-actions {
		display: flex;
		align-items: center;
		gap: 12px;

		form {
			button {
				background: none;
				border: none;
				display: flex;
			}
		}
	}

	.outer-container {
		padding: 16px;
	}

	nav {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-top: 16px;
	}
</style>
