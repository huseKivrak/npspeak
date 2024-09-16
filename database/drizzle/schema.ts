import {
  pgTable,
  pgEnum,
  bigint,
  timestamp,
  uuid,
  varchar,
  text,
  boolean,
  integer,
  serial,
  unique,
  real,
  date,
  jsonb,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { authUsers as users } from '../supabase/authSchema';

/**
 * Updated & introspected schema after applying migration for Stripe integration:
 * https://github.com/vercel/nextjs-subscription-payments/blob/main/supabase/migrations/20230530034630_init.sql
 *
 *
 */

//Stripe-related enums
export const aal_level = pgEnum('aal_level', ['aal1', 'aal2', 'aal3']);
export const code_challenge_method = pgEnum('code_challenge_method', [
  's256',
  'plain',
]);
export const factor_status = pgEnum('factor_status', [
  'unverified',
  'verified',
]);
export const factor_type = pgEnum('factor_type', ['totp', 'webauthn']);
export const one_time_token_type = pgEnum('one_time_token_type', [
  'confirmation_token',
  'reauthentication_token',
  'recovery_token',
  'email_change_token_new',
  'email_change_token_current',
  'phone_change_token',
]);
export const request_status = pgEnum('request_status', [
  'PENDING',
  'SUCCESS',
  'ERROR',
]);
export const key_status = pgEnum('key_status', [
  'default',
  'valid',
  'invalid',
  'expired',
]);
export const key_type = pgEnum('key_type', [
  'aead-ietf',
  'aead-det',
  'hmacsha512',
  'hmacsha256',
  'auth',
  'shorthash',
  'generichash',
  'kdf',
  'secretbox',
  'secretstream',
  'stream_xchacha20',
]);
export const pricing_plan_interval = pgEnum('pricing_plan_interval', [
  'day',
  'week',
  'month',
  'year',
]);
export const pricing_type = pgEnum('pricing_type', ['one_time', 'recurring']);
export const subscription_status = pgEnum('subscription_status', [
  'trialing',
  'active',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'unpaid',
  'paused',
]);
export const action = pgEnum('action', [
  'INSERT',
  'UPDATE',
  'DELETE',
  'TRUNCATE',
  'ERROR',
]);
export const equality_op = pgEnum('equality_op', [
  'eq',
  'neq',
  'lt',
  'lte',
  'gt',
  'gte',
  'in',
]);

export const npcs = pgTable('npcs', {
  id: bigint('id', { mode: 'number' })
    .primaryKey()
    .generatedByDefaultAsIdentity({
      name: 'characters_id_seq',
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
  created_at: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  user_id: uuid('user_id')
    .default(sql`auth.uid()`)
    .notNull()
    .references(() => users.id, { onDelete: 'set null' }),
  npc_name: varchar('npc_name').notNull(),
  description: text('description'),
  voice_id: text('voice_id'),
  is_default: boolean('is_default').default(false).notNull(),
});

export const npc_dialogues = pgTable('npc_dialogues', {
  id: bigint('id', { mode: 'number' })
    .primaryKey()
    .generatedByDefaultAsIdentity({
      name: 'npc_dialogues_dialogue_id_seq',
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
  npc_id: integer('npc_id').references(() => npcs.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  dialogue_type_id: integer('dialogue_type_id').references(
    () => npc_dialogue_types.id
  ),
  text: text('text').notNull(),
  user_id: uuid('user_id')
    .default(sql`auth.uid()`)
    .references(() => users.id),
  is_default: boolean('is_default').default(false).notNull(),
  tts_audio_id: bigint('tts_audio_id', { mode: 'number' }).references(
    () => tts_audio.id,
    { onDelete: 'set null', onUpdate: 'cascade' }
  ),
});

export const npc_dialogue_types = pgTable('npc_dialogue_types', {
  id: serial('id').primaryKey().notNull(),
  type_name: varchar('type_name', { length: 50 }).notNull(),
  user_id: uuid('user_id')
    .default(sql`auth.uid()`)
    .references(() => users.id, { onDelete: 'set null' }),
  is_default: boolean('is_default').default(false).notNull(),
});

export const tts_audio = pgTable(
  'tts_audio',
  {
    id: bigint('id', { mode: 'number' })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: 'tts_audio_id_seq',
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
        cache: 1,
      }),
    created_at: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    user_id: uuid('user_id')
      .default(sql`auth.uid()`)
      .notNull()
      .references(() => users.id, { onDelete: 'set null' }),
    duration_seconds: real('duration_seconds').notNull(),
    source_text: text('source_text').notNull(),
    file_url: text('file_url').notNull(),
    is_default: boolean('is_default').default(false).notNull(),
    voice_id: text('voice_id'),
  },
  (table) => {
    return {
      tts_audio_file_url_key: unique('tts_audio_file_url_key').on(
        table.file_url
      ),
    };
  }
);

export const audio_clips = pgTable(
  'audio_clips',
  {
    id: bigint('id', { mode: 'number' })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: 'audio_clips_id_seq',
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
        cache: 1,
      }),
    user_id: uuid('user_id')
      .default(sql`auth.uid()`)
      .notNull()
      .references(() => users.id, { onDelete: 'set null' }),
    created_at: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    file_url: text('file_url').notNull(),
    original_file_name: text('original_file_name').notNull(),
    duration_seconds: bigint('duration_seconds', { mode: 'number' }).notNull(),
    is_default: boolean('is_default').default(false).notNull(),
    audio_clip_name: varchar('audio_clip_name').notNull(),
  },
  (table) => {
    return {
      audio_clips_file_url_key: unique('audio_clips_file_url_key').on(
        table.file_url
      ),
    };
  }
);

export const campaigns = pgTable('campaigns', {
  id: bigint('id', { mode: 'number' })
    .primaryKey()
    .generatedByDefaultAsIdentity({
      name: 'campaigns_id_seq',
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
  created_at: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  user_id: uuid('user_id')
    .default(sql`auth.uid()`)
    .notNull()
    .references(() => users.id, { onDelete: 'set null' }),
  description: text('description'),
  updated_at: timestamp('updated_at', { withTimezone: true, mode: 'string' }),
  start_date: date('start_date'),
  end_date: date('end_date'),
  is_default: boolean('is_default').default(false).notNull(),
  campaign_name: varchar('campaign_name').notNull(),
});

export const voice_clones = pgTable(
  'voice_clones',
  {
    id: bigint('id', { mode: 'number' })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: 'voice_clones_id_seq',
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
        cache: 1,
      }),
    user_id: uuid('user_id')
      .default(sql`auth.uid()`)
      .references(() => users.id, { onDelete: 'set null' }),
    created_at: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    clone_url: text('clone_url'),
    elevenlabs_voice_id: text('elevenlabs_voice_id'),
    status: text('status').notNull(),
    is_default: boolean('is_default').default(false).notNull(),
    voice_clone_name: varchar('voice_clone_name'),
  },
  (table) => {
    return {
      voice_clones_elevenlabs_voice_id_unique: unique(
        'voice_clones_elevenlabs_voice_id_unique'
      ).on(table.elevenlabs_voice_id),
    };
  }
);

export const prices = pgTable('prices', {
  id: text('id').primaryKey().notNull(),
  product_id: text('product_id').references(() => products.id),
  active: boolean('active'),
  description: text('description'),
  unit_amount: bigint('unit_amount', { mode: 'number' }),
  currency: text('currency'),
  type: pricing_type('type'),
  interval: pricing_plan_interval('interval'),
  interval_count: integer('interval_count'),
  trial_period_days: integer('trial_period_days'),
  metadata: jsonb('metadata'),
});

export const customers = pgTable('customers', {
  id: uuid('id')
    .primaryKey()
    .notNull()
    .references(() => users.id),
  stripe_customer_id: text('stripe_customer_id'),
});

export const products = pgTable('products', {
  id: text('id').primaryKey().notNull(),
  active: boolean('active'),
  name: text('name'),
  description: text('description'),
  image: text('image'),
  metadata: jsonb('metadata'),
});

export const profiles = pgTable('profiles', {
  id: uuid('id')
    .primaryKey()
    .notNull()
    .references(() => users.id),
  full_name: text('full_name'),
  avatar_url: text('avatar_url'),
  billing_address: jsonb('billing_address'),
  payment_method: jsonb('payment_method'),
  username: text('username').notNull(),
  email: text('email').notNull(),
  subscription_status: subscription_status('subscription_status'),
  promo_code: varchar('promo_code', { length: 50 }),
});

export const subscriptions = pgTable('subscriptions', {
  id: text('id').primaryKey().notNull(),
  user_id: uuid('user_id')
    .notNull()
    .references(() => users.id),
  status: subscription_status('status'),
  metadata: jsonb('metadata'),
  price_id: text('price_id').references(() => prices.id),
  quantity: integer('quantity'),
  cancel_at_period_end: boolean('cancel_at_period_end'),
  created: timestamp('created', { withTimezone: true, mode: 'string' })
    .notNull()
    .default(sql`now()`),
  current_period_start: timestamp('current_period_start', {
    withTimezone: true,
    mode: 'string',
  })
    .notNull()
    .default(sql`now()`),
  current_period_end: timestamp('current_period_end', {
    withTimezone: true,
    mode: 'string',
  })
    .notNull()
    .default(sql`now()`),
  ended_at: timestamp('ended_at', {
    withTimezone: true,
    mode: 'string',
  }).default(sql`now()`),
  cancel_at: timestamp('cancel_at', {
    withTimezone: true,
    mode: 'string',
  }).default(sql`now()`),
  canceled_at: timestamp('canceled_at', {
    withTimezone: true,
    mode: 'string',
  }).default(sql`now()`),
  trial_start: timestamp('trial_start', {
    withTimezone: true,
    mode: 'string',
  }).default(sql`now()`),
  trial_end: timestamp('trial_end', {
    withTimezone: true,
    mode: 'string',
  }).default(sql`now()`),
});

export const campaign_npcs = pgTable(
  'campaign_npcs',
  {
    campaign_id: bigint('campaign_id', { mode: 'number' })
      .notNull()
      .references(() => campaigns.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    npc_id: bigint('npc_id', { mode: 'number' })
      .notNull()
      .references(() => npcs.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  },
  (table) => {
    return {
      campaign_npcs_pkey: primaryKey({
        columns: [table.campaign_id, table.npc_id],
        name: 'campaign_npcs_pkey',
      }),
    };
  }
);

export const promo_codes = pgTable('promo_codes', {
  id: serial('id').primaryKey().notNull(),
  code: varchar('code', { length: 50 }).unique().notNull(),
  is_active: boolean('is_active').default(true).notNull(),
  usage_count: integer('usage_count').default(0).notNull(),
  max_usage: integer('max_usage').default(1).notNull(),
  created_at: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
});
