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
					type: 'string'
				});
			}

			if (value && !isURL(value)) {
				ctx.addIssue({ code: 'custom', message: 'Invalid URL' });
			}

			if (value && !regex.test(value)) {
				ctx.addIssue({ code: 'custom', message: `Invalid ${name} URL` });
			}
		});

export const updateProfileSchema = z.object({
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
	backgroundColor: requiredString,
	buttonTextColor: requiredString,
	buttonBorderSize: requiredString,
	links: z
		.object({
			title: requiredString.min(5, 'Minimum of 5').max(50, 'Maximum of 50'),
			url: requiredString.url('Invalid URL').min(5, 'Minimum of 5').max(100, 'Maximum of 100'),
			id: z.union([z.string(), z.number()])
		})
		.array()
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;