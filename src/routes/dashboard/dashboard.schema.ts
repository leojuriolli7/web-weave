import { requiredString } from '$lib/utils/requiredString';
import { z } from 'zod';

const titleSchema = requiredString.min(5, 'Minimum of 5').max(50, 'Maximum of 50');
const urlSchema = requiredString
	.url('Invalid URL')
	.min(5, 'Minimum of 5')
	.max(100, 'Maximum of 100');

export const createLinkSchema = z.object({
	title: titleSchema,
	url: urlSchema
});

export const deleteLinkSchema = z.object({
	id: z.coerce.number().positive()
});

export const editLinkSchema = z.object({
	newTitle: titleSchema,
	newUrl: urlSchema,
	id: z.coerce.number().positive()
});
