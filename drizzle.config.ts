import type { Config } from 'drizzle-kit';
import { cwd } from 'process';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(cwd());

const pw = process.env.DATABASE_PASSWORD || '';
const dbHost = process.env.DATABASE_HOST || '';

export default {
  schema: './app/schema/*',
  schemaFilter: ['public', 'auth'],
  out: './database/drizzle',
  driver: 'pg',
  dbCredentials: {
    user: 'postgres',
    password: pw,
    host: dbHost,
    port: 5432,
    database: 'postgres',
  },
} satisfies Config;
