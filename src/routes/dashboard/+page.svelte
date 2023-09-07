<script>
	import { enhance } from '$app/forms';
	import Button from '$components/Button.svelte';
	import Field from '$components/Field.svelte';
	import { Plus } from 'lucide-svelte';

	let isLoading = false;
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

					return ({ update }) => {
						isLoading = false;
						update();
					};
				}}
			>
				<section>
					<h2>Your information</h2>
					<p>Enter your profile information here.</p>

					<div class="fields space-y">
						<Field
							disabled={isLoading}
							prefix="webweave.com/"
							style="margin-top: 16px"
							label="Name"
							name="name"
							placeholder="your username..."
						/>

						<Field
							disabled={isLoading}
							label="About yourself"
							name="description"
							placeholder="A description about you..."
							type="textarea"
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
						/>
						<Field
							disabled={isLoading}
							label="Instagram"
							name="instagram"
							placeholder="instagram.com/you"
						/>
						<Field
							disabled={isLoading}
							label="Facebook"
							name="facebook"
							placeholder="facebook.com/you"
						/>
						<Field
							disabled={isLoading}
							label="Youtube"
							name="youtube"
							placeholder="youtube.com/@you"
						/>
						<Field
							disabled={isLoading}
							label="Linkedin"
							name="linkedin"
							placeholder="linkedin.com/you"
						/>
						<Field
							disabled={isLoading}
							label="Reddit"
							name="reddit"
							placeholder="reddit.com/u/you"
						/>
						<Field disabled={isLoading} label="Twitch" name="twitch" placeholder="twitch.tv/you" />
						<Field
							disabled={isLoading}
							label="Telegram"
							name="telegram"
							placeholder="telegram.com/you"
						/>
					</div>
				</section>

				<section>
					<h2>Add more links</h2>
					<p>Add any extra links you might want to share.</p>

					<div class="fields space-y">
						<div class="link-form">
							<Field
								disabled={isLoading}
								label="Title"
								name="title"
								placeholder="Give your link a title..."
							/>
							<Field
								disabled={isLoading}
								label="URL"
								name="url"
								placeholder="Type a url..."
								style="margin-top: 16px"
							/>
						</div>

						<Button disabled={isLoading} type="button" variant="primary" full size="large">
							<Plus size={22} />
						</Button>
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

	.link-form {
		padding: 16px;
		border-radius: 12px;
		border: 1px solid var(--border);
	}

	.save-footer {
		position: sticky;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 10px 0;
	}
</style>
