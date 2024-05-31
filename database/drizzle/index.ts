import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { cwd } from 'process';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(cwd());

const connectionString = process.env.POSTGRES_URL;
if (!connectionString) {
	console.error('No DATABASE_URL provided');
	process.exit(1);
}

const client = postgres(connectionString, {
	prepare: false,
});
export const db = drizzle(client);
