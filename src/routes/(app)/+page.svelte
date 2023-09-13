<script>
	import { MetaTags, Button } from '$components';

	export let data;

	$: isLoggedIn = data.session?.isLoggedIn;
</script>

<MetaTags
	title="Web Weave"
	description="Streamline your online presence. All your links in one place."
	color="#151515"
/>

<main>
	<div class="headline">
		<h1>Streamline your online presence in one link.</h1>
		<p>
			One link to help you share everything you create, curate and sell from your Instagram, TikTok,
			Twitter, YouTube and other social media profiles.
		</p>

		<a href={isLoggedIn ? '/dashboard' : '/login/github'} style:margin-top="64px">
			<Button
				tabindex={-1}
				variant="brand"
				size="large"
				style="border-radius: 20px; padding: 16px 32px; font-size: 18px;"
				>{isLoggedIn ? 'Access your dashboard' : "Let's begin"}</Button
			>
		</a>
	</div>
</main>

<section class="secondary">
	<h2><span>"Link in bio"</span> with super powers</h2>
	<p>Seamlessly connect with the tools you already use.</p>

	<p>
		You can keep everything you want to share online in one link. When you’ve got a change, you only
		ever have to make it once.
	</p>
</section>

<style lang="scss">
	main {
		background-color: var(--medium-gray);
		padding: 128px 32px;
		text-align: center;

		p {
			font-size: clamp(16px, 2vmin, 20px);
			font-weight: 400;
			letter-spacing: -0.02em;
			line-height: 1.5;
			color: #e787eb;
			margin-top: 32px;
			max-width: 700px;
		}
	}

	section.secondary {
		padding: 128px 32px;
		background: var(--dark-gray);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;

		h2 {
			color: #23b5d3;
			font-size: clamp(32px, 5.5vmin, 42px);
			letter-spacing: -0.02em;

			span {
				text-shadow: #ed7b84 2px 3px;
			}
		}

		p {
			font-size: clamp(16px, 2vmin, 20px);
			font-weight: 400;
			letter-spacing: -0.02em;
			line-height: 1.5;
			color: #75abbc;
			margin-top: 32px;
			max-width: 700px;
		}
	}

	.headline {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	a {
		text-decoration: none;
	}

	h1 {
		color: #8075ff;
		font-size: clamp(32px, 8.5vmin, 50px);
		letter-spacing: -0.02em;
		text-shadow: #f92a82 2px 2px;
	}
</style>
