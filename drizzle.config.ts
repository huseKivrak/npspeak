//Config for drizzle-kit only

import { cwd } from 'process';
import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'drizzle-kit';

loadEnvConfig(cwd());

const pw = process.env.DATABASE_PASSWORD || '';
const dbHost = process.env.DATABASE_HOST || '';
const dbUser = process.env.DATABASE_USER || '';
export default defineConfig({
  schema: './database/drizzle/schema.ts',
  schemaFilter: ['public'],
  out: './database/drizzle',
  dialect: 'postgresql',
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
  verbose: true,
  strict: true,
});
