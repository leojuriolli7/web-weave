import { z } from 'zod';
import isURL from 'validator/lib/isURL';

const regexes = {
	twitter: /^(https?:\/\/)?(www\.)?twitter\.com\/([a-zA-Z0-9_]+)\/?$/i,
	instagram: /^(https?:\/\/)?(www\.)?instagram\.com\/([a-zA-Z0-9_]+)\/?$/i,
	facebook: /^(https?:\/\/)?(www\.)?facebook\.com\/([a-zA-Z0-9_.-]+)\/?$/i,
	youtube:
		/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(channel\/|user\/|c\/)?([a-zA-Z0-9_-]+)\/?$/i,
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
	telegram: getSocialSchema(regexes.telegram, 'Telegram')
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
