import type {Config} from 'drizzle-kit';
import {cwd} from 'process';
import {loadEnvConfig} from '@next/env';

loadEnvConfig(cwd());

const pw = process.env.DATABASE_PASSWORD || '';
const dbHost = process.env.DATABASE_HOST || '';
const dbUser = process.env.DATABASE_USER || '';
export default {
	schema: './database/drizzle/schema.ts',
	schemaFilter: ['public'],
	out: './database/drizzle',
	driver: 'pg',
	dbCredentials: {
		user: dbUser,
		password: pw,
		host: dbHost,
		port: 6543,
		database: 'postgres',
	},
	introspect: {
		casing: 'preserve',
	},
} satisfies Config;
