<script lang="ts">
	export let value: number | string;
	export let min: number = 0;
	export let max: number;
  export let name: string;
</script>

<div>
	<label>
		<input type="range" name={name} {min} {max} on:input bind:value />
		<slot />
	</label>
</div>

<style lang="scss">
	div {
		margin-top: 16px;
		label {
			display: flex;
			align-items: center;
			gap: 6px;
			font-size: 14px;

			color: var(--silver);
		}

		input {
			padding: 0;
		}
	}
</style>
