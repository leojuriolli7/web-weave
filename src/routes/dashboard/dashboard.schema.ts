import { requiredString } from '$lib/utils/requiredString';
import { z } from 'zod';
import isURL from 'validator/lib/isURL';

const socialURLSchema = z
	.string()
	.max(200, 'Maximum of 200')
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
	});

export const updateProfileSchema = z.object({
	name: requiredString.min(5, 'Minimum of 5').max(30, 'Maximum of 30'),
	description: z.string().max(200, 'Maximum of 200'),
	twitter: socialURLSchema,
	instagram: socialURLSchema,
	facebook: socialURLSchema,
	youtube: socialURLSchema,
	linkedin: socialURLSchema,
	reddit: socialURLSchema,
	twitch: socialURLSchema,
	telegram: socialURLSchema
});
