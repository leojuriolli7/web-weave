import { libsql } from '@lucia-auth/adapter-sqlite';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { github } from '@lucia-auth/oauth/providers';
import { sqlClient } from './db';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

export const auth = lucia({
	adapter: libsql(sqlClient, {
		user: 'auth_user',
		key: 'auth_key',
		session: 'user_session'
	}),
	env: process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV',
	middleware: sveltekit(),
	getUserAttributes: (user) => ({
		userId: user.id,
		username: user.username
	})
});

export const githubAuth = github(auth, {
	clientId: GITHUB_CLIENT_ID,
	clientSecret: GITHUB_CLIENT_SECRET
});

export type Auth = typeof auth;
