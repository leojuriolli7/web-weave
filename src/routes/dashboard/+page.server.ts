import { links as linksTable } from '$drizzle/schema';
import { tursoClient } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import { createLinkSchema } from './dashboard.schema';
import { eq } from 'drizzle-orm';

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
	createLink: async ({ request, locals }) => {
		const session = await locals.auth.validate();

		if (!session) throw redirect(302, '/');

		const form = Object.fromEntries(await request.formData());
		const input = createLinkSchema.safeParse(form);

		if (!input.success) {
			// Loop through the errors array and create a custom errors array
			const errors = input.error.errors.map((error) => {
				return {
					field: error.path[0],
					message: error.message
				};
			});

			const parsedErrors = getFirstMessages(errors);

			return fail(400, { error: true, errors: parsedErrors });
		}

		const { title, url } = input.data;

		await tursoClient.insert(linksTable).values({
			authorId: session.user.userId,
			title,
			url
		});
	}
};
