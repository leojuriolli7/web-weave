import { users } from '$drizzle/schema';
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
	depends('app:your-dashboard');

	if (!session) throw redirect(302, '/');

	const profile = await tursoClient.query.users.findFirst({
		where: eq(users.id, session.user.userId),
		with: {
			links: true
		}
	});

	if (!profile) throw redirect(302, '/');

	return {
		user: session.user,
		profile
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

		const { ...values } = input.data;

		await tursoClient.update(users).set({
			...values
		});
	}
};
