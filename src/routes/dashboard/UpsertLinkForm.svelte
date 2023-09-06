<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';

	type DefaultValues = {
		title: string;
		url: string;
		id: number;
	};

	export let loading: boolean;
	export let mode: 'edit' | 'create';

	export let defaultValues: DefaultValues | undefined = undefined;

	const isCreate = mode === 'create';
</script>

<form
	method="POST"
	style:width="100%"
	action={isCreate ? '?/createLink' : '?/editLink'}
	use:enhance={() => {
		loading = true;

		return ({ update, result }) => {
			loading = false;
			update();

			if (result.type === 'success') {
				if (mode === 'edit') {
					$page.url.searchParams.delete('editLink');

					goto($page.url, { noScroll: true, replaceState: true });
				}

				// update the links list
				invalidate('app:your-links');
			}
		};
	}}
>
	{#if mode === 'edit'}
		<input name="id" value={defaultValues?.id} style:display="none" style:visibility="hidden" />
	{/if}

	<Field
		defaultValue={defaultValues?.url}
		label="Your link URL"
		placeholder="Write a url..."
		name={isCreate ? 'url' : 'newUrl'}
	/>

	<Field
		label="Your link title"
		placeholder="Write a title..."
		name={isCreate ? 'title' : 'newTitle'}
		style="margin-top: 16px"
		defaultValue={defaultValues?.title}
	/>

	<div class="buttons">
		{#if mode === 'edit'}
			<a data-sveltekit-noscroll data-sveltekit-replacestate href="/dashboard">
				<Button disabled={loading} variant="danger" full type="button">Cancel</Button>
			</a>
		{/if}

		<Button {loading} variant="primary" type="submit">
			{isCreate ? 'Create new link' : 'Update link'}
		</Button>
	</div>
</form>

<style lang="scss">
	.buttons {
		display: flex;
		gap: 10px;
		align-items: center;
		margin-top: 16px;

		a {
			width: 50%;
			text-decoration: none;
		}

		:global(button[type='submit']:nth-child(2)) {
			width: 50%;
		}

		@media (max-width: 400px) {
			flex-direction: column-reverse;
			:global(button[type='submit']:nth-child(2)) {
				width: 100%;
			}

			a {
				width: 100%;
			}
		}

		:global(button[type='submit']:first-child) {
			width: 100%;
		}
	}
</style>
