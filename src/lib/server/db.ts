import { type LibSQLDatabase, drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client/http';
import * as schema from '$drizzle/schema';
import { TURSO_TOKEN, TURSO_URL } from '$env/static/private';

export const sqlClient = createClient({
	url: TURSO_URL as string,
	authToken: TURSO_TOKEN as string
});

export const tursoClient: LibSQLDatabase<typeof schema> = drizzle(sqlClient, { schema });
