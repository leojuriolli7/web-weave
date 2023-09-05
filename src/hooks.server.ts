import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// have access to auth everywhere on the server
	event.locals.auth = auth.handleRequest(event);
	return await resolve(event);
};
