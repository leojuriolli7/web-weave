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

	<Button {loading} full variant="brand" type="submit" style="margin-top: 16px">
		{isCreate ? 'Create new link' : 'Update link'}
	</Button>
</form>
