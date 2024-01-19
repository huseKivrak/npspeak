import {
  pgTable,
  unique,
  bigint,
  uuid,
  timestamp,
  text,
  varchar,
  boolean,
  serial,
  integer,
  date,
  pgSchema,
  index,
  uniqueIndex,
  jsonb,
  smallint,
  primaryKey,
} from 'drizzle-orm/pg-core';

export const auth = pgSchema('auth');

export const audioClips = pgTable(
  'audio_clips',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
    userId: uuid('user_id').references(() => profiles.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    fileUrl: text('file_url').notNull(),
    originalFileName: text('original_file_name').notNull(),
    status: text('status').default(''),
    durationSeconds: bigint('duration_seconds', { mode: 'number' }).notNull(),
  },
  (table) => {
    return {
      audioClipsFileUrlKey: unique('audio_clips_file_url_key').on(table.fileUrl),
    };
  }
);

export const npcs = pgTable('npcs', {
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'set null' }),
  name: varchar('name').notNull(),
  description: text('description'),
  voiceId: bigint('voice_id', { mode: 'number' }).references(() => voiceClones.id, {
    onDelete: 'set null',
  }),
  isVoiceClone: boolean('is_voice_clone').default(false).notNull(),
});

export const npcDialogueTypes = pgTable('npc_dialogue_types', {
  id: serial('id').primaryKey().notNull(),
  typeName: varchar('type_name', { length: 50 }).notNull(),
});

export const voiceClones = pgTable('voice_clones', {
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  cloneUrl: text('clone_url'),
  elevenlelevenlabsVoiceId: text('elevenlelevenlabs_voice_id'),
  status: text('status').notNull(),
});

export const npcDialogues = pgTable('npc_dialogues', {
  dialogueId: serial('dialogue_id').primaryKey().notNull(),
  npcId: integer('npc_id').references(() => npcs.id),
  dialogueTypeId: integer('dialogue_type_id').references(() => npcDialogueTypes.id),
  text: text('text').notNull(),
  isStock: boolean('is_stock').default(false),
  //todo: no check constraints in drizzle (zod?)
});

export const campaigns = pgTable('campaigns', {
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'set null' }),
  description: text('description'),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }),
  startDate: date('start_date'),
  endDate: date('end_date'),
});

export const profiles = pgTable('profiles', {
  id: uuid('id')
    .primaryKey()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' }),
  username: text('username'),
  fullName: text('full_name'),
  avatarUrl: text('avatar_url'),
  website: text('website'),
});

export const ttsAudio = pgTable(
  'tts_audio',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    voiceId: bigint('voice_id', { mode: 'number' }).references(() => voiceClones.id, {
      onDelete: 'set null',
    }),
    userId: uuid('user_id').references(() => profiles.id, { onDelete: 'set null' }),
    durationSeconds: bigint('duration_seconds', { mode: 'number' }).notNull(),
    sourceText: text('source_text').notNull(),
    fileUrl: text('file_url').notNull(),
  },
  (table) => {
    return {
      ttsAudioFileUrlKey: unique('tts_audio_file_url_key').on(table.fileUrl),
    };
  }
);

export const campaignNpcs = pgTable(
  'campaign_npcs',
  {
    campaignId: bigint('campaign_id', { mode: 'number' })
      .notNull()
      .references(() => campaigns.id, { onDelete: 'cascade' }),
    npcId: bigint('npc_id', { mode: 'number' })
      .notNull()
      .references(() => npcs.id, { onDelete: 'cascade' }),
  },
  (table) => {
    return {
      campaignNpcsPkey: primaryKey({
        columns: [table.campaignId, table.npcId],
        name: 'campaign_npcs_pkey',
      }),
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

///////////////////////////////////////////////////////////////
//todo: avoid needing (read-only) auth schema
///////////////////////////////////////////////////////////////
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
