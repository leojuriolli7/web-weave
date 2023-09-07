import { links as linksTable } from '$drizzle/schema';
import { tursoClient } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import { updateProfileSchema } from './dashboard.schema';
import { eq } from 'drizzle-orm';
import type { ZodError } from 'zod';

function getFirstMessages(
	arr: { field: string | number; message: string }[]
): Record<string, { message: string }> {
	const resultMap: Record<string, { message: string }> = {};

	for (const item of arr) {
		if (!resultMap[item.field]) {
			resultMap[item.field] = { message: item.message };
		}
	}

	return resultMap;
}

function parseZodErrors(formErrors: ZodError) {
	const formattedErrors = formErrors.errors.map((error) => {
		return {
			field: error.path[0],
			message: error.message
		};
	});

	return getFirstMessages(formattedErrors);
}

export const load = async ({ locals, depends }) => {
	const session = await locals.auth.validate();
	depends('app:your-links');

	if (!session) throw redirect(302, '/');

	return {
		user: session.user,
		links: await tursoClient.query.links.findMany({
			where: eq(linksTable.authorId, session.user.userId)
		})
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) throw redirect(302, '/');

		const form = Object.fromEntries(await request.formData());
		const input = updateProfileSchema.safeParse(form);

		if (!input.success) {
			const errors = parseZodErrors(input.error);

			return fail(400, { error: true, errors });
		}
	}
};
