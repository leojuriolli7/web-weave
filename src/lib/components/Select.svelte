<script lang="ts">
	export let options: string[] = [];
	export let value: string;
	export let name: string;
	export let style: string | undefined = undefined;

	const id = (Math.random() * 10e15).toString(16);
</script>

<div {style}>
	<label for={id}>
		<slot />
	</label>
	<select {id} {name} bind:value>
		{#each options as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
</div>

<style>
	label {
		font-size: 14px;
		line-height: 22px;
		color: var(--silver);
	}

	select {
		background-color: var(--medium-gray);
		border-radius: 4px;
		border-color: var(--border);
		display: block;
		font: inherit;
		line-height: 1.5em;
		padding: 0.5em 3.5em 0.5em 1em;
		margin: 3px 0 0 0;
		appearance: none;
		color: var(--silver);
		cursor: pointer;
		width: 100%;
		transition: all cubic-bezier(0.215, 0.61, 0.355, 1) 0.3s;

		background-image: linear-gradient(45deg, transparent 50%, var(--silver) 50%),
			linear-gradient(135deg, var(--silver) 50%, transparent 50%),
			linear-gradient(to right, var(--border), var(--border));
		background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px),
			calc(100% - 2.5em) 0.5em;
		background-size: 5px 5px, 5px 5px, 1px 1.5em;
		background-repeat: no-repeat;

		&:hover {
			opacity: 0.8;
		}
	}
</style>
