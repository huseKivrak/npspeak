import {drizzle} from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import {cwd} from 'process';
import {loadEnvConfig} from '@next/env';

loadEnvConfig(cwd());

// const connectionString = process.env.SUPABASE_POOLING_STRING || '';
const connectionString = process.env.DATABASE_URL || '';

const client = postgres(connectionString, {
	prepare: false,
});
export const db = drizzle(client);
