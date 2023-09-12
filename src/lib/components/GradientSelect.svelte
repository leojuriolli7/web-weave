<script>
	import { colorsStore } from '$lib/stores/colors';
	import RangeInput from './RangeInput.svelte';
</script>

<div class="outer">
	<RangeInput name="gradientDegrees" max={360} bind:value={$colorsStore.gradientDegrees}>
		{$colorsStore.gradientDegrees}°
	</RangeInput>

	<div class="inputs-container">
		<div class="color-container">
			<label>
				<input name="firstGradientColor" type="color" bind:value={$colorsStore.gradientColors[0]} />
				Click to select the first gradient color</label
			>
		</div>

		<div class="color-container">
			<label>
				<input
					name="secondGradientColor"
					type="color"
					bind:value={$colorsStore.gradientColors[1]}
				/>
				Click to select the second color</label
			>
		</div>
	</div>
</div>

<style lang="scss">
	.outer {
		margin-top: 24px;
	}

	.inputs-container {
		margin-top: 12px;
	}

	.color-container {
		display: flex;
		align-items: center;
		gap: 6px;

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
	}
</style>
