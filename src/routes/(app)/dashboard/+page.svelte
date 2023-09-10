<script>
	import { applyAction, enhance } from '$app/forms';
	import { Button, Drawer, Field } from '$components';
	import { invalidate } from '$app/navigation';
	import { expoInOut } from 'svelte/easing';
	import { Plus, Trash2 } from 'lucide-svelte';
	import { slide } from 'svelte/transition';
	import PhonePreview from './Preview/PhonePreview.svelte';
	import ColorField from '$components/ColorField/ColorField.svelte';
	import { colorsStore, getColorsFromUser } from '$lib/stores/colors';

	export let data;

	$: profile = data.profile;

	let isLoading = false;
	let drawerVisible = false;

	let drawerTransitionParams = {
		y: 200,
		duration: 400,
		easing: expoInOut
	};

	$: if ($colorsStore && $colorsStore.firstTime) $colorsStore = getColorsFromUser(profile);

	/**
	 * TO-DOs:
	 * - Linear gradient background
	 * - Custom hover effects and box-shadows configuration
	 * - Select link icons
	 * - Image uploads (avatar, background and link icons)
	 * - Ordering
	 */
</script>

<svelte:head>
	<title>Web Weave | Dashboard</title>
</svelte:head>

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
					<h2>Colors & Appearance</h2>
					<p>Customize the appearance of your page.</p>
					<div class="fields fields-grid space-y">
						<ColorField value={$colorsStore.usernameColor} key="usernameColor">
							Username Color
						</ColorField>
						<ColorField value={$colorsStore.descriptionColor} key="descriptionColor">
							Description Color
						</ColorField>
						<ColorField value={$colorsStore.backgroundColor} key="backgroundColor">
							Background Color
						</ColorField>
						<ColorField value={$colorsStore.buttonsBackgroundColor} key="buttonsBackgroundColor">
							Button Background Color
						</ColorField>
						<ColorField value={$colorsStore.buttonsBorderColor} key="buttonsBorderColor">
							Button Border Color
						</ColorField>
						<ColorField value={$colorsStore.buttonTextColor} key="buttonTextColor">
							Button Text Color
						</ColorField>
						<ColorField value={$colorsStore.iconsColor} key="iconsColor">
							Social Icons Color
						</ColorField>
					</div>

					<div class="button-border-input">
						<label>
							<input
								type="range"
								name="buttonBorderSize"
								min={0}
								max={10}
								on:input={(e) => {
									$colorsStore.buttonBorderSize = `${e.currentTarget.value}px`;
								}}
								value={$colorsStore.buttonBorderSize.split('px')[0]}
							/>
							Button border size
						</label>
					</div>
				</section>

				<section class="social-section">
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

				<section>
					<h2>Add more links</h2>
					<p>Add any extra links you might want to share.</p>

					<div class="fields space-y">
						{#each profile.links as link (link.id)}
							<div transition:slide class="link-form">
								<Button
									variant="danger"
									size="base"
									style="position: absolute; top: -10px; right: 10px;"
									title="Delete this link"
									on:click={() => {
										profile.links = profile.links.filter((value) => value.id !== link.id);
									}}
								>
									<Trash2 size={18} />
								</Button>
								<Field
									disabled={isLoading}
									label="Title"
									name="links.title[{link.id}]"
									placeholder="Give your link a title..."
									bind:value={link.title}
								/>
								<Field
									disabled={isLoading}
									label="URL"
									name="links.url[{link.id}]"
									placeholder="Type a url..."
									style="margin-top: 16px"
									bind:value={link.url}
								/>
							</div>
						{/each}

						<Button
							on:click={() => {
								const randomNumber = Math.random() * 10e15;
								const id = `__new-${randomNumber}`;

								profile.links.push({
									image: null,
									id,
									authorId: profile.id,
									title: '',
									url: ''
								});

								profile.links = profile.links;
							}}
							disabled={isLoading}
							type="button"
							variant="primary"
							full
							size="large"
						>
							<Plus size={22} />
						</Button>
					</div>
				</section>

				<div class="save-footer">
					<Button
						on:click={() => (drawerVisible = true)}
						type="button"
						disabled={isLoading}
						size="large">Open Preview</Button
					>
					<Button type="submit" variant="brand" loading={isLoading} size="large">Update</Button>
				</div>
			</form>

			<!-- Mobile preview -->
			<Drawer
				placement="bottom"
				transitionParams={drawerTransitionParams}
				bind:visible={drawerVisible}
				id="preview-drawer"
				width="100%"
			>
				<div class="preview-drawer-content">
					<PhonePreview user={data.user} {profile} />
				</div>
			</Drawer>
		</main>

		<!-- Desktop preview -->
		<section class="right-side">
			<PhonePreview user={data.user} {profile} />
		</section>
	</div>
</div>

<style lang="scss">
	.outer {
		max-width: 1200px;
		width: 100%;
		margin: 0 auto;
		padding: 0 30px 60px 30px;

		& > p {
			color: var(--light-gray);
			line-height: 24px;
		}
		h1 {
			color: var(--white);

			@media (max-width: 700px) {
				margin-top: 32px;
			}
		}

		@media (max-width: 700px) {
			padding: 0 16px 30px 16px;
		}
	}
	.content {
		width: 100%;
		display: flex;
		gap: 32px;
		justify-content: center;
	}
	section:not(.right-side) {
		border: 1px solid var(--border);
		border-radius: 12px;
		padding: 24px;
		width: 100%;

		@media (max-width: 700px) {
			padding: 16px;
		}

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

	.social-section {
		container-type: inline-size;
	}
	.fields-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: end;
		column-gap: 12px;

		@container (width < 390px) {
			& {
				grid-template-columns: 1fr;
			}
		}
	}

	.left-side {
		position: relative;
	}
	.right-side {
		display: flex;
		justify-content: center;

		@media (max-width: 975px) {
			flex: 20%;
		}
		@media (max-width: 700px) {
			display: none;
		}
	}

	.save-footer {
		position: sticky;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 10px 0;
		display: flex;
		gap: 12px;

		:global(button:first-child) {
			display: none;

			@media (max-width: 700px) {
				display: flex;
			}
		}

		:global(button) {
			flex: 1;
		}
	}

	.preview-drawer-content {
		padding: 32px 16px;
		display: flex;
		justify-content: center;
	}

	.link-form {
		padding: 16px;
		border-radius: 12px;
		border: 1px solid var(--border);
		position: relative;
	}

	.button-border-input {
		margin-top: 16px;
		label {
			display: flex;
			align-items: center;
			gap: 6px;

			color: var(--silver);
		}

		input {
			padding: 0;
			accent-color: var(--brand-muted);
		}
	}
</style>
