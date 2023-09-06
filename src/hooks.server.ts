import { auth } from '$lib/server/lucia';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// have access to auth everywhere on the server.
	event.locals.auth = auth.handleRequest(event);

	// `/dashboard` routes are protected.
	if (event.url.pathname.startsWith('/dashboard')) {
		const session = await event.locals.auth.validate();

		if (!session) {
			throw redirect(303, '/');
		}
	}

	return await resolve(event);
};
