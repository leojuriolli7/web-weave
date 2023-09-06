import { users as usersTable } from '$drizzle/schema';
import { tursoClient } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async ({ params }) => {
	const { slug } = params;
	const user = await tursoClient.query.users.findFirst({
		where: eq(usersTable.username, slug),
		with: {
			links: true
		}
	});

	if (!user) throw error(404, 'User not found.');

	return {
		user
	};
};
