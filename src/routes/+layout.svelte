<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import NProgress from 'nprogress';
	import { navigating } from '$app/stores';
	import 'nprogress/nprogress.css';
	import '../app.scss';

	NProgress.configure({
		minimum: 0.16,
		showSpinner: false
	});

	$: {
		if ($navigating) {
			NProgress.start();
		} else NProgress.done();
	}

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
