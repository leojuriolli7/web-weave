import { z } from 'zod';
import isURL from 'validator/lib/isURL';
import { requiredString } from '$lib/utils/requiredString';

const regexes = {
	twitter: /^(https?:\/\/)?(www\.)?twitter\.com\/([a-zA-Z0-9_]+)\/?$/i,
	instagram: /^(https?:\/\/)?(www\.)?instagram\.com\/([a-zA-Z0-9_]+)\/?$/i,
	facebook: /^(https?:\/\/)?(www\.)?facebook\.com\/([a-zA-Z0-9_.-]+)\/?$/i,
	youtube: /^(https?:\/\/)?(www\.)?youtube\.com\/(c\/|channel\/|user\/)?@?([a-zA-Z0-9_-]+)\/?$/i,
	tiktok: /^(https?:\/\/)?(www\.)?tiktok\.com\/@([a-zA-Z0-9_.-]+)\/?$/i,
	linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)\/?$/i,
	twitch: /^(https?:\/\/)?(www\.)?twitch\.tv\/([a-zA-Z0-9_]+)\/?$/i,
	telegram: /^(https?:\/\/)?(www\.)?t\.me\/([a-zA-Z0-9_]+)\/?$/i
};

const getSocialSchema = (regex: RegExp, name: string) =>
	z
		.string()
		.max(200, 'Maximum of 200')
		.nullable()
		.superRefine((value, ctx) => {
			if (value && value.length < 5) {
				ctx.addIssue({
					code: 'too_small',
					inclusive: false,
					minimum: 5,
					type: 'string',
					message: "Minimum of 5"
				});
			}

			if (value && !isURL(value)) {
				ctx.addIssue({ code: 'custom', message: 'Invalid URL' });
			}

			if (value && !regex.test(value)) {
				ctx.addIssue({ code: 'custom', message: `Invalid ${name} URL` });
			}
		});

export const updateProfileSchema = z
	.object({
		description: z.string().max(200, 'Maximum of 200').nullable(),
		twitter: getSocialSchema(regexes.twitter, 'Twitter'),
		instagram: getSocialSchema(regexes.instagram, 'Instagram'),
		facebook: getSocialSchema(regexes.facebook, 'Facebook'),
		youtube: getSocialSchema(regexes.youtube, 'Youtube'),
		linkedin: getSocialSchema(regexes.linkedin, 'Linkedin'),
		tiktok: getSocialSchema(regexes.tiktok, 'Tiktok'),
		twitch: getSocialSchema(regexes.twitch, 'Twitch'),
		telegram: getSocialSchema(regexes.telegram, 'Telegram'),
		buttonsBackgroundColor: requiredString,
		buttonsBorderColor: requiredString,
		iconsColor: requiredString,
		descriptionColor: requiredString,
		usernameColor: requiredString,
		buttonFontWeight: requiredString,
		backgroundColor: z.string().optional(),
		firstGradientColor: z.string().optional(),
		secondGradientColor: z.string().optional(),
		gradientDegrees: z.coerce.number().optional(),
		buttonTextColor: requiredString,
		buttonBorderSize: requiredString,

		// html input returns a string instead of boolean...
		gradient: z.union([z.literal('true'), z.literal('false')]),
		links: z
			.object({
				title: requiredString.min(5, 'Minimum of 5').max(50, 'Maximum of 50'),
				url: requiredString.url('Invalid URL').min(5, 'Minimum of 5').max(100, 'Maximum of 100'),
				id: z.union([z.string(), z.number()]),
				image: z.string().nullable()
			})
			.array()
	})
	.superRefine(
		(
			{ backgroundColor, gradient, firstGradientColor, secondGradientColor, gradientDegrees },
			ctx
		) => {
			if (gradient === 'false' && !backgroundColor) {
				return ctx.addIssue({
					code: 'custom',
					message: 'Required',
					path: ['backgroundColor']
				});
			}

			if (gradient === 'true') {
				if (!firstGradientColor) {
					ctx.addIssue({
						code: 'custom',
						message: 'Required',
						path: ['firstGradientColor']
					});
				}

				if (!secondGradientColor) {
					ctx.addIssue({
						code: 'custom',
						message: 'Required',
						path: ['secondGradientColor']
					});
				}

				if (gradientDegrees !== 0 && !gradientDegrees) {
					ctx.addIssue({
						code: 'custom',
						message: 'Required',
						path: ['gradientDegrees']
					});
				}
			}
		}
	);

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
