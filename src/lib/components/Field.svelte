<script lang="ts">
	import { page } from '$app/stores';

	type Error = {
		message: string;
	};

	export let name: string;
	export let label: string;
	export let placeholder: string;
	export let style: string | undefined = undefined;

	$: error = $page.form?.errors?.[name] as Error | undefined;
</script>

<div {style}>
	<label for={name}> {label} </label>
	{#if error}
		<p class="error-message">{error?.message}</p>
	{/if}
	<input {placeholder} id={name} {name} />
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	label {
		font-size: 18px;
		line-height: 22px;
		color: var(--silver);
	}

	p.error-message {
		color: var(--error);
		margin-top: 2px;
		font-size: 14px;
		line-height: 20px;
	}

	input {
		padding: 10px;
		background-color: var(--medium-gray);
		border: 1px solid var(--border);
		border-radius: 10px;
		font-size: 16px;
		color: var(--light-gray);
		margin-top: 6px;

		&::placeholder {
			color: var(--muted-gray);
		}
	}
</style>
