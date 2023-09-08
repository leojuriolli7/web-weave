<script lang="ts">
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import type { IconNames } from './MediaIcon/MediaIcon.svelte';
	import MediaIcon from './MediaIcon/MediaIcon.svelte';

	type Error = {
		message: string;
	};

	export let name: string;
	export let label: string;
	export let placeholder: string;
	export let style: string | undefined = undefined;
	export let prefix: string | undefined = undefined;
	export let type: 'text' | 'textarea' = 'text';
	export let disabled = false;
	export let value: string | null = null;
	export let maxLength: number | undefined = undefined;
	export let icon: IconNames | undefined = undefined;

	const id = (Math.random() * 10e15).toString(16);

	$: error = $page.form?.errors?.[name] as Error | undefined;

	let input: HTMLElement;
	$: if (error) input.focus();
</script>

<div class="outer" {style}>
	<label for={id}> {label} </label>
	{#if error}
		<p transition:slide class="error-message">{error?.message}</p>
	{/if}
	<div class="input-box" class:has-prefix={prefix || icon}>
		{#if prefix && type === 'text'}
			<span class="prefix">
				{prefix}
			</span>
		{/if}

		{#if icon}
			<div class="field-icon">
				<MediaIcon media={icon} color="var(--white)" size={19} />
			</div>
		{/if}

		{#if type === 'text'}
			<input
				bind:this={input}
				{disabled}
				class="field-input"
				bind:value
				type="text"
				{placeholder}
				{id}
				{name}
			/>
		{:else}
			<textarea
				bind:this={input}
				{disabled}
				class="field-input"
				bind:value
				{placeholder}
				{id}
				{name}
				maxlength={maxLength}
			/>
		{/if}

		{#if type === 'textarea' && maxLength}
			<div class="max-length-container">
				<span>
					{value?.length || 0} / {maxLength}
				</span>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.outer {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	label {
		font-size: 14px;
		line-height: 22px;
		color: var(--silver);
	}

	p.error-message {
		color: var(--error);
		font-size: 13px;
		line-height: 20px;
	}

	.prefix {
		font-size: 15px;
		color: var(--white);
		padding-left: 10px;
	}

	.input-box {
		background-color: var(--medium-gray);
		border: 1px solid var(--border);
		border-radius: 10px;
		margin-top: 4px;
		display: flex;
		align-items: center;
		gap: 1px;
		position: relative;

		textarea {
			height: 100px;
		}

		.field-input {
			border-radius: 10px;
			padding: 10px;
			background-color: var(--medium-gray);
			width: 100%;
			border: none;
			font-size: 15px;
			color: var(--white);
			resize: vertical;

			&:disabled {
				opacity: 0.5;
				cursor: not-allowed;
			}

			&::placeholder {
				color: var(--muted-gray);
			}
		}
	}

	.has-prefix {
		.field-input {
			padding: 10px 10px 10px 0;
		}

		.field-input:focus-visible {
			outline: none;
		}

		&:focus-within {
			outline: 3px solid var(--brand-muted);
		}
	}

	.max-length-container {
		position: absolute;
		bottom: 2px;
		right: 10px;
		span {
			font-size: 12px;
			color: var(--silver);
			background: var(--medium-gray);
		}
	}

	.field-icon {
		padding: 4px 6px 0 10px;
		height: 100%;
	}
</style>
