<script lang="ts">
	export let width: string;
</script>

<div aria-haspopup="true" class="container">
	<slot name="trigger" />

	<div class="content" aria-label="submenu" style:width>
		<slot name="content" />
	</div>
</div>

<style lang="scss">
	.container {
		position: relative;

		&:hover,
		&:focus-within {
			.content {
				opacity: 1;
				visibility: visible;
				transform: translateY(33px);
			}
		}
	}

	.content {
		position: absolute;
		z-index: 2;
		transition: 280ms all 120ms cubic-bezier(0.215, 0.61, 0.355, 1);
		top: 6px;
		background: var(--medium-gray);
		box-shadow: 0 0.5em 0.75em rgba(black, 0.25);
		border-radius: 12px;
		padding: 16px;
		display: flex;
		right: 0;
		flex-direction: column;
		gap: 12px;
		opacity: 0;
		visibility: hidden;
	}
</style>
