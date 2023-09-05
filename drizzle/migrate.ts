import 'dotenv/config';
import { migrate } from 'drizzle-orm/libsql/migrator';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

export const client = createClient({
	url: process.env.TURSO_URL as string,
	authToken: process.env.TURSO_TOKEN as string
});

export const db = drizzle(client);

async function main() {
	try {
		await migrate(db, {
			migrationsFolder: 'drizzle/migrations'
		});
		console.log('Tables migrated!');
		process.exit(0);
	} catch (error) {
		console.error('Error performing migration: ', error);
		process.exit(1);
	}
}

main();
