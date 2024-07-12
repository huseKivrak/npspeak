//Config for drizzle-kit only

import { cwd } from 'process';
import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'drizzle-kit';

loadEnvConfig(cwd());

export default defineConfig({
  schema: './database/drizzle/schema.ts',
  schemaFilter: ['public'],
  out: './database/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
  introspect: {
    casing: 'preserve',
  },
  verbose: true,
  strict: true,
});
