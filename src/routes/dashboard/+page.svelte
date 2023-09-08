<script>
	import { applyAction, enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import { invalidate } from '$app/navigation';
	import PhonePreview from './Preview/PhonePreview.svelte';

	export let data;

	$: profile = data.profile;

	let isLoading = false;

	/**
	 * TO-DOs:
	 * 1. Extra/Custom links
	 * 2. Responsive design
	 * 3. Display links on profile page
	 * 4. Finish homepage
	 * 5. Custom colors/styling
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
							bind:value={profile.username}
						/>

						<Field
							disabled={isLoading}
							label="About yourself"
							name="description"
							placeholder="A description about you..."
							type="textarea"
							maxLength={200}
							bind:value={profile.description}
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
							icon="Twitter"
							bind:value={profile.twitter}
						/>
						<Field
							disabled={isLoading}
							label="Instagram"
							icon="Instagram"
							name="instagram"
							placeholder="instagram.com/you"
							bind:value={profile.instagram}
						/>

						<Field
							disabled={isLoading}
							label="Facebook"
							icon="Facebook"
							name="facebook"
							placeholder="facebook.com/you"
							bind:value={profile.facebook}
						/>
						<Field
							disabled={isLoading}
							label="Youtube"
							icon="Youtube"
							name="youtube"
							placeholder="youtube.com/@you"
							bind:value={profile.youtube}
						/>
						<Field
							disabled={isLoading}
							label="Linkedin"
							icon="Linkedin"
							name="linkedin"
							placeholder="linkedin.com/you"
							bind:value={profile.linkedin}
						/>
						<Field
							disabled={isLoading}
							label="Tiktok"
							icon="Tiktok"
							name="tiktok"
							placeholder="tiktok.com/@you"
							bind:value={profile.tiktok}
						/>
						<Field
							disabled={isLoading}
							label="Twitch"
							icon="Twitch"
							name="twitch"
							placeholder="twitch.tv/you"
							bind:value={profile.twitch}
						/>
						<Field
							disabled={isLoading}
							label="Telegram"
							icon="Telegram"
							name="telegram"
							placeholder="telegram.com/you"
							bind:value={profile.telegram}
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
			<PhonePreview user={data.user} {profile} />
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
	}

	.save-footer {
		position: sticky;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 10px 0;
	}
</style>
