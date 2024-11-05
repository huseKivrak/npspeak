import * as schema from './schema';
import * as relations from './relations';
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

//Disable prepared statements - not supported by Supavisor pooler (transactions)
const postgresClient = postgres(connectionString, { prepare: false });
export const db = drizzle(postgresClient, {
  schema: { ...schema, ...relations },
  logger: true,
});
