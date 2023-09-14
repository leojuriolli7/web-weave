<script lang="ts">
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<slot />

<style>
	:root::view-transition-old(root) {
		animation-duration: 300ms;
	}

	:root::view-transition-new(root) {
		animation-duration: 300ms;
	}
</style>
