<script lang="ts" context="module">
	export type ModalRef = {
		closeModal: () => void;
		openModal: () => void;
	};
</script>

<script lang="ts">
	import { X as CloseIcon } from 'lucide-svelte';

	let dialog: HTMLDialogElement;

	export const closeModal = () => dialog.close();
	export const openModal = () => dialog.showModal();
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:keypress={(e) => {
		if (e.key === 'Escape') {
			dialog.close();
		}
	}}
	on:click|self={() => dialog.close()}
>
	{#if $$slots.header}
		<div class="header">
			<slot name="header" />

			<button
				type="button"
				on:click={() => {
					dialog.close();
				}}
				class="close-icon"
			>
				<CloseIcon size={18} color="var(--silver)" />
			</button>
		</div>
	{/if}

	<div class="content">
		<slot />
	</div>

	{#if $$slots.footer}
		<div class="footer">
			<slot name="footer" />
		</div>
	{/if}
</dialog>

<style lang="scss">
	dialog {
		max-width: min(32em, 90vw);
		max-height: 95vh;
		border-radius: 16px;
		border: none;
		margin: auto;
		background: var(--dark-gray);

		&::-webkit-scrollbar {
			display: none;
		}

		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	dialog::backdrop {
		background: hsla(240, 10%, 4%, 0.8);
		backdrop-filter: blur(4px);
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	.content {
		padding: 32px 0;
	}

	.header {
		position: relative;
		padding-top: 16px;
		padding-bottom: 16px;
		padding-left: 16px;
		padding-right: 58px;
		border-bottom: 1px solid var(--border);

		.close-icon {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			cursor: pointer;
			right: 16px;
			display: flex;
			background: none;
			border: none;
			outline: none;
			appearance: none;
			padding: 4px;
			background: var(--border);
			border-radius: 999px;
			transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);

			&:hover {
				background: var(--muted-gray);
			}
		}
	}

	.footer {
		padding: 16px 0;
		border-top: 1px solid var(--border);
	}

	.content,
	.footer {
		padding-left: 16px;
		padding-right: 16px;
	}
</style>
