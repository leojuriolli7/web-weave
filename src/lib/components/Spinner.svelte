<script lang="ts">
	export let color: string = '#fff';
	export let size: number = 60;
</script>

<div class="circle" style="--size: {size}px; --color: {color}; --duration: 0.75s" />

<style>
	.circle {
		display: inline-block;
		height: var(--size);
		width: var(--size);
		border-color: var(--color) transparent var(--color) var(--color);
		border-width: calc(var(--size) / 15);
		border-style: solid;
		border-image: initial;
		border-radius: 50%;
		animation: var(--duration) linear 0s infinite normal none running rotate;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
