import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();

	// cant access /login unless logged out
	if (session) throw redirect(302, '/');
	return {};
};
