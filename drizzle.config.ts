import type { Config } from 'drizzle-kit';

const pw = process.env.DATABASE_PASSWORD || '';


export default {
  schema: './app/schema/*',
  schemaFilter: ['public', 'auth'],
  out: './database/drizzle',
  driver: 'pg',
  dbCredentials: {
    user: 'postgres',
    password: pw,
    host: 'db.vjyydfwpiotwefkntrtk.supabase.co',
    port: 5432,
    database: 'postgres',
  },
} satisfies Config;
