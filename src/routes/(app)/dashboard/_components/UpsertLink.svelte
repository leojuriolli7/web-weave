<script lang="ts">
	import { Button } from '$components';
	import Field from '$components/Field.svelte';
	import Popover from '$components/Popover.svelte';
	import { ImageIcon, Trash2 } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import SelectIcons from '$components/SelectIcons/SelectIcons.svelte';

	export let isLoading: boolean;
	export let link: {
		id: string;
		image: string | null;
		title: string;
		url: string;
		authorId: string;
	};

	let selectIcons: { openModal: () => void };

	const dispatch = createEventDispatcher();
</script>

<div transition:slide class="link-form">
	<div class="link-options">
		<Popover width="170px">
			<Button type="button" size="base" slot="trigger">
				<ImageIcon size={18} />
			</Button>

			<div class="icon-options" slot="content">
				<Button
					type="button"
					full
					variant="tertiary"
					on:click={() => {
						selectIcons.openModal();
					}}
				>
					Edit icon
				</Button>
				<Button
					type="button"
					full
					variant="tertiary"
					on:click={() => {
						dispatch('removeicon');
					}}
				>
					Remove icon
				</Button>
			</div>
		</Popover>

		<Button
			type="button"
			variant="danger"
			size="base"
			title="Delete this link"
			on:click={() => {
				dispatch('deletelink');
			}}
		>
			<Trash2 size={18} />
		</Button>
	</div>
	<Field
		disabled={isLoading}
		label="Title"
		name="links.title[{link.id}]"
		placeholder="Give your link a title..."
		bind:value={link.title}
	/>
	<Field
		disabled={isLoading}
		label="URL"
		name="links.url[{link.id}]"
		placeholder="Type a url..."
		style="margin-top: 16px"
		bind:value={link.url}
	/>

	<input
		style:visiblity="hidden"
		style:display="none"
		value={link.image}
		name="links.image[{link.id}]"
	/>
</div>

<SelectIcons bind:value={link.image} bind:this={selectIcons} />

<style lang="scss">
	.link-form {
		padding: 16px;
		border-radius: 12px;
		border: 1px solid var(--border);
		position: relative;

		.link-options {
			display: flex;
			gap: 10px;
			align-items: center;
			position: absolute;
			top: -10px;
			right: 10px;

			.icon-options {
				display: flex;
				flex-direction: column;
				gap: 12px;
			}
		}
	}
</style>
