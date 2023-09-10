<script lang="ts">
	import { colorsStore, type AllowedColors } from '$lib/stores/colors';

	export let key: keyof AllowedColors;
	export let value: string;

	$: $colorsStore[key] = value;
</script>

<label>
	<input name={key} style="padding:0" type="color" bind:value />
	<slot />
</label>

<style lang="scss">
	label {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 14px;
		line-height: 20px;
		color: var(--silver);
		transition: all ease 0.3s;
		cursor: pointer;

		&:hover {
			opacity: 0.7;
		}
	}

	input {
		padding: 0;
		cursor: pointer;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background-color: transparent;
		width: 40px;
		min-width: 40px;
		height: 40px;
		min-height: 40px;
		border: none;

		&::-webkit-color-swatch {
			border-radius: 50px;
			border: 3px solid var(--medium-gray);
		}
		&::-moz-color-swatch {
			border-radius: 50px;
			border: 3px solid var(--medium-gray);
		}
	}
</style>
