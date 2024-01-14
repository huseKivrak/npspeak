import {
  pgTable,
  foreignKey,
  pgEnum,
  bigint,
  unique,
  uuid,
  timestamp,
  text,
  pgSchema,
  varchar,
  index,
  uniqueIndex,
  jsonb,
  boolean,
  smallint,
  inet,
  json,
  bigserial,
  primaryKey,
  integer,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const keyStatus = pgEnum('key_status', ['default', 'valid', 'invalid', 'expired']);
export const keyType = pgEnum('key_type', [
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
export const factorType = pgEnum('factor_type', ['totp', 'webauthn']);
export const factorStatus = pgEnum('factor_status', ['unverified', 'verified']);
export const aalLevel = pgEnum('aal_level', ['aal1', 'aal2', 'aal3']);
export const codeChallengeMethod = pgEnum('code_challenge_method', ['s256', 'plain']);
export const requestStatus = pgEnum('request_status', ['PENDING', 'SUCCESS', 'ERROR']);

export const auth = pgSchema('auth');

export const campaignCharacters = pgTable('campaign_characters', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  campaign: bigint('campaign', { mode: 'number' }).references(() => campaigns.id, {
    onDelete: 'cascade',
  }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  character: bigint('character', { mode: 'number' }).references(() => characters.id, {
    onDelete: 'cascade',
  }),
});

export const audioClips = pgTable(
  'audio_clips',
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
    userId: uuid('user_id').references(() => profiles.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    fileUrl: text('file_url').notNull(),
    originalFileName: text('original_file_name').notNull(),
    status: text('status').default(''),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    durationSeconds: bigint('duration_seconds', { mode: 'number' }).notNull(),
  },
  (table) => {
    return {
      audioClipsFileUrlKey: unique('audio_clips_file_url_key').on(table.fileUrl),
    };
  }
);

export const characters = pgTable('characters', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'set null' }),
  name: text('name').notNull(),
  description: text('description'),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  voiceId: bigint('voice_id', { mode: 'number' }).references(() => voiceClones.id, {
    onDelete: 'set null',
  }),
});

export const voiceClones = pgTable('voice_clones', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  cloneUrl: text('clone_url'),
  elevenlelevenlabsVoiceId: text('elevenlelevenlabs_voice_id'),
  status: text('status').notNull(),
});

export const campaigns = pgTable('campaigns', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'set null' }),
  description: text('description'),
});

export const profiles = pgTable(
  'profiles',
  {
    id: uuid('id')
      .primaryKey()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }),
    username: text('username'),
    fullName: text('full_name'),
    avatarUrl: text('avatar_url'),
    website: text('website'),
  },
  (table) => {
    return {
      profilesUsernameKey: unique('profiles_username_key').on(table.username),
    };
  }
);

export const ttsAudio = pgTable('tts_audio', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  voiceId: bigint('voice_id', { mode: 'number' }).references(() => voiceClones.id, {
    onDelete: 'set null',
  }),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'set null' }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  durationSeconds: bigint('duration_seconds', { mode: 'number' }).notNull(),
  sourceText: text('source_text').notNull(),
});

export const schemaMigrations = auth.table('schema_migrations', {
  version: varchar('version', { length: 255 }).primaryKey().notNull(),
});

export const instances = auth.table('instances', {
  id: uuid('id').primaryKey().notNull(),
  uuid: uuid('uuid'),
  rawBaseConfig: text('raw_base_config'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }),
});

export const users = auth.table(
  'users',
  {
    instanceId: uuid('instance_id'),
    id: uuid('id').primaryKey().notNull(),
    aud: varchar('aud', { length: 255 }),
    role: varchar('role', { length: 255 }),
    email: varchar('email', { length: 255 }),
    encryptedPassword: varchar('encrypted_password', { length: 255 }),
    emailConfirmedAt: timestamp('email_confirmed_at', { withTimezone: true, mode: 'string' }),
    invitedAt: timestamp('invited_at', { withTimezone: true, mode: 'string' }),
    confirmationToken: varchar('confirmation_token', { length: 255 }),
    confirmationSentAt: timestamp('confirmation_sent_at', { withTimezone: true, mode: 'string' }),
    recoveryToken: varchar('recovery_token', { length: 255 }),
    recoverySentAt: timestamp('recovery_sent_at', { withTimezone: true, mode: 'string' }),
    emailChangeTokenNew: varchar('email_change_token_new', { length: 255 }),
    emailChange: varchar('email_change', { length: 255 }),
    emailChangeSentAt: timestamp('email_change_sent_at', { withTimezone: true, mode: 'string' }),
    lastSignInAt: timestamp('last_sign_in_at', { withTimezone: true, mode: 'string' }),
    rawAppMetaData: jsonb('raw_app_meta_data'),
    rawUserMetaData: jsonb('raw_user_meta_data'),
    isSuperAdmin: boolean('is_super_admin'),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }),
    phone: text('phone').default(''),
    phoneConfirmedAt: timestamp('phone_confirmed_at', { withTimezone: true, mode: 'string' }),
    phoneChange: text('phone_change').default(''),
    phoneChangeToken: varchar('phone_change_token', { length: 255 }).default(''),
    phoneChangeSentAt: timestamp('phone_change_sent_at', { withTimezone: true, mode: 'string' }),
    confirmedAt: timestamp('confirmed_at', { withTimezone: true, mode: 'string' }),
    emailChangeTokenCurrent: varchar('email_change_token_current', { length: 255 }).default(''),
    emailChangeConfirmStatus: smallint('email_change_confirm_status').default(0),
    bannedUntil: timestamp('banned_until', { withTimezone: true, mode: 'string' }),
    reauthenticationToken: varchar('reauthentication_token', { length: 255 }).default(''),
    reauthenticationSentAt: timestamp('reauthentication_sent_at', {
      withTimezone: true,
      mode: 'string',
    }),
    isSsoUser: boolean('is_sso_user').default(false).notNull(),
    deletedAt: timestamp('deleted_at', { withTimezone: true, mode: 'string' }),
  },
  (table) => {
    return {
      instanceIdIdx: index('users_instance_id_idx').on(table.instanceId),
      instanceIdEmailIdx: index('users_instance_id_email_idx').on(table.instanceId),
      confirmationTokenIdx: uniqueIndex('confirmation_token_idx').on(table.confirmationToken),
      recoveryTokenIdx: uniqueIndex('recovery_token_idx').on(table.recoveryToken),
      emailChangeTokenCurrentIdx: uniqueIndex('email_change_token_current_idx').on(
        table.emailChangeTokenCurrent
      ),
      emailChangeTokenNewIdx: uniqueIndex('email_change_token_new_idx').on(
        table.emailChangeTokenNew
      ),
      reauthenticationTokenIdx: uniqueIndex('reauthentication_token_idx').on(
        table.reauthenticationToken
      ),
      emailPartialKey: uniqueIndex('users_email_partial_key').on(table.email),
      usersPhoneKey: unique('users_phone_key').on(table.phone),
    };
  }
);

export const voiceCloneClips = pgTable(
  'voice_clone_clips',
  {
    voiceCloneId: integer('voice_clone_id')
      .notNull()
      .references(() => voiceClones.id, { onDelete: 'cascade' }),
    audioClipId: integer('audio_clip_id')
      .notNull()
      .references(() => audioClips.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      voiceCloneClipsPkey: primaryKey({
        columns: [table.voiceCloneId, table.audioClipId],
        name: 'voice_clone_clips_pkey',
      }),
    };
  }
);
