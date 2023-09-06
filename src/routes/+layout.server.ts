export const load = async ({ locals }) => {
	const session = await locals.auth.validate();

	return {
		session: {
			isLoggedIn: !!session,
			user: session?.user
		}
	};
};
