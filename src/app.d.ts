/* eslint-disable @typescript-eslint/ban-types */
/// <reference types="lucia" />

declare global {
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = {
			username: string;
			email: string | null;
			avatar: string;
		};
		type DatabaseSessionAttributes = {};
	}

	// See https://kit.svelte.dev/docs/types#app
	// for information about these interfaces
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
