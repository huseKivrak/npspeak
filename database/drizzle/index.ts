import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { profiles } from './schema';

const connectionString = process.env.SUPABASE_POOLING_STRING ||''

const client = postgres(connectionString, {
  prepare: false,
});
export const db=drizzle(client);

