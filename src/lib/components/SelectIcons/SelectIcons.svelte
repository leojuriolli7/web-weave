<script lang="ts">
	import Modal, { type ModalRef } from '$components/Modal.svelte';
	import { icons } from './icons';

	export let value: string | null;

	let modal: ModalRef;

	export function openModal() {
		return modal.openModal();
	}
</script>

<Modal bind:this={modal}>
	<h3 slot="header">Select an icon for your link</h3>
	<div class="container">
		{#each icons as icon (icon.name)}
			<label class="icon">
				<span class="sr-only">Select {icon.name}</span>
				<input
					type="radio"
					bind:group={value}
					value={icon.name}
					style:visiblity="hidden"
					style:display="none"
				/>
				<svelte:component this={icon.component} />
			</label>
		{/each}
	</div>
</Modal>

<style lang="scss">
	.container {
		display: flex;
		gap: 12px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.icon {
		padding: 12px;
		display: flex;
		align-items: center;
		flex-direction: column;
		text-align: center;
		gap: 12px;
		border-radius: 20px;
		background: var(--medium-gray);
		transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
		cursor: pointer;
		border: 1px solid var(--border);

		&:hover {
			background: #ffffff26;
		}
	}

	h3 {
		color: var(--brand-muted);
		font-size: 21px;

		@media (max-width: 975px) {
			font-size: 18px;
		}
	}

	.icon:has(input:checked) {
		background: var(--brand-muted);
	}
</style>
