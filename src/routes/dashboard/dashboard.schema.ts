import { requiredString } from '$lib/utils/requiredString';
import { z } from 'zod';

export const createLinkSchema = z.object({
	title: requiredString.min(5, 'Minimum of 5').max(50, 'Maximum of 50'),
	url: requiredString.url('Invalid URL').min(5, 'Minimum of 5').max(100, 'Maximum of 100')
});

export const deleteLinkSchema = z.object({
	id: z.coerce.number().positive()
});
