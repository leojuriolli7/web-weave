<script>
	import { applyAction, enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import { invalidate } from '$app/navigation';

	export let data;

	$: profile = data.profile;

	let isLoading = false;

	/**
	 * TO-DOs:
	 * 1. Extra/Custom links
	 * 2. Real-time preview
	 * 3. Responsive design
	 * 4. Display links on profile page
	 * 5. Finish homepage
	 */
</script>

<div class="outer">
	<h1>Your Dashboard</h1>
	<p>Here is your personal hub for customizing your account and your links.</p>
	<div class="content">
		<main class="left-side">
			<form
				method="POST"
				class="space-y"
				use:enhance={() => {
					isLoading = true;

					return ({ result }) => {
						isLoading = false;

						if (result.type === 'success') {
							invalidate('app:your-dashboard');
						}

						applyAction(result);
					};
				}}
			>
				<section>
					<h2>Your information</h2>
					<p>Enter your profile information here.</p>

					<div class="fields space-y">
						<Field
							disabled
							prefix="webweave.com/"
							style="margin-top: 16px"
							label="Name"
							name="username"
							placeholder="your username..."
							defaultValue={profile.username}
						/>

						<Field
							disabled={isLoading}
							label="About yourself"
							name="description"
							placeholder="A description about you..."
							type="textarea"
							defaultValue={profile.description}
						/>
					</div>
				</section>

				<section>
					<h2>Your social links</h2>
					<p>Centralize all your social media.</p>

					<div class="fields space-y fields-grid">
						<Field
							disabled={isLoading}
							label="Twitter"
							name="twitter"
							placeholder="twitter.com/you"
							defaultValue={profile.twitter}
						/>
						<Field
							disabled={isLoading}
							label="Instagram"
							name="instagram"
							placeholder="instagram.com/you"
							defaultValue={profile.instagram}
						/>
						<Field
							disabled={isLoading}
							label="Facebook"
							name="facebook"
							placeholder="facebook.com/you"
							defaultValue={profile.facebook}
						/>
						<Field
							disabled={isLoading}
							label="Youtube"
							name="youtube"
							placeholder="youtube.com/@you"
							defaultValue={profile.youtube}
						/>
						<Field
							disabled={isLoading}
							label="Linkedin"
							name="linkedin"
							placeholder="linkedin.com/you"
							defaultValue={profile.linkedin}
						/>
						<Field
							disabled={isLoading}
							label="Reddit"
							name="reddit"
							placeholder="reddit.com/u/you"
							defaultValue={profile.reddit}
						/>
						<Field
							disabled={isLoading}
							label="Twitch"
							name="twitch"
							placeholder="twitch.tv/you"
							defaultValue={profile.twitch}
						/>
						<Field
							disabled={isLoading}
							label="Telegram"
							name="telegram"
							placeholder="telegram.com/you"
							defaultValue={profile.telegram}
						/>
					</div>
				</section>

				<div class="save-footer">
					<Button type="submit" variant="brand" loading={isLoading} full size="large"
						>Save your changes</Button
					>
				</div>
			</form>
		</main>

		<div class="right-side">
			<img src="/phone.png" alt="Phone" />
		</div>
	</div>
</div>

<style lang="scss">
	.outer {
		max-width: 1200px;
		width: 100%;
		margin: 0 auto;
		padding-bottom: 60px;

		& > p {
			color: var(--light-gray);
			line-height: 24px;
		}
		h1 {
			color: var(--white);
		}
	}
	.content {
		width: 100%;
		display: flex;
		gap: 32px;
		justify-content: center;
	}
	section {
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 24px;
		width: 100%;

		h2 {
			line-height: 30px;
			font-size: 24px;
			color: var(--brand-muted);
		}

		p {
			color: var(--silver);
			line-height: 22px;
			font-size: 15px;
			margin-top: 6px;
		}
	}

	.left-side,
	.right-side {
		flex: 50%;
	}

	.fields-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: end;
		column-gap: 12px;
	}

	.left-side {
		position: relative;
	}
	.right-side {
		display: flex;
		justify-content: center;

		img {
			top: 32px;
			position: sticky;
			min-width: 400px;
			height: 700px;
			width: 400px;
		}
	}

	.save-footer {
		position: sticky;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 10px 0;
	}
</style>
