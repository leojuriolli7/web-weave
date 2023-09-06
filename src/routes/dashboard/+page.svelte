<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { Link } from '$components';
	import { Pencil, Trash2, X as CloseIcon } from 'lucide-svelte';
	import UpsertLinkForm from './UpsertLinkForm.svelte';

	export let data;
	let creatingLink = false;
	let deletingLinks: number[] = [];
	let editingLinks: number[] = [];

	$: editParam = $page.url.searchParams.get('edit');
</script>

<div class="outer-container">
	<section>
		<h2>Your created links</h2>

		<nav>
			{#each data.links as link (link.id)}
				{@const isEditing = editParam && Number(editParam) === link.id}
				{@const loadingDelete = deletingLinks?.some((value) => value === link.id)}
				{@const loadingEdit = editingLinks?.some((value) => value === link.id)}
				{@const loading = loadingDelete || loadingEdit}
				{@const canShowActions = !loading && !isEditing}

				<Link {loading} {link} showLink={!isEditing}>
					<UpsertLinkForm
						slot="alternate"
						loading={creatingLink}
						mode="edit"
						defaultValues={{
							id: link.id,
							title: link.title,
							url: link.url
						}}
					/>

					<div class="link-actions" slot="right">
						{#if canShowActions}
							<form
								method="POST"
								action="?/deleteLink"
								title="Delete this link"
								class="delete-form"
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
								<button
									style:background="none"
									style:border="none"
									class="action-icon-container"
									type="submit"
									disabled={loading}
								>
									<Trash2 style="cursor:pointer" size={21} color="var(--white)" />
								</button>
							</form>

							<a
								class="action-icon-container"
								href={isEditing ? '/dashboard' : `?edit=${link.id}`}
								title={isEditing ? 'Stop editing this link' : 'Edit this link'}
								data-sveltekit-noscroll
								data-sveltekit-replacestate
								class:loading
							>
								{#if isEditing}
									<CloseIcon style="cursor:pointer" size={20} color="var(--white)" />
								{:else}
									<Pencil style="cursor:pointer" size={20} color="var(--white)" />
								{/if}
							</a>
						{/if}
					</div>
				</Link>
			{/each}
		</nav>
	</section>

	<section class="create-link-container">
		<h2 style:margin-bottom="16px">Create a new link</h2>
		<UpsertLinkForm loading={creatingLink} mode="create" />
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
		max-width: 300px;

		@media (max-width: 1200px) {
			margin-top: 32px;
		}
	}

	.link-actions {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.action-icon-container {
		display: flex;
	}

	.outer-container {
		padding: 32px;
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		gap: 32px;

		@media (max-width: 800px) {
			display: block;
		}
	}

	section {
		flex: 50%;
	}

	nav {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-top: 16px;
	}
</style>
