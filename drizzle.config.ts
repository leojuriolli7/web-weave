import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
	schema: './drizzle/schema.ts',
	out: './drizzle/migrations',
	driver: 'turso',
	dbCredentials: {
		url: process.env.TURSO_URL as string,
		authToken: process.env.TURSO_TOKEN as string
	}
} satisfies Config;
