import {
	pgTable,
	unique,
	bigint,
	uuid,
	timestamp,
	text,
	boolean,
	varchar,
	serial,
	integer,
	date,
	primaryKey,
} from 'drizzle-orm/pg-core';
import {sql} from 'drizzle-orm';
import {authUsers as users} from '../supabase/authSchema';

export const campaigns = pgTable('campaigns', {
	id: serial('id').primaryKey().notNull(),
	created_at: timestamp('created_at', {withTimezone: true, mode: 'string'})
		.defaultNow()
		.notNull(),
	user_id: uuid('user_id')
		.default(sql`auth.uid()`)
		.references(() => users.id, {onDelete: 'set null'}),
	description: text('description'),
	updated_at: timestamp('updated_at', {withTimezone: true, mode: 'string'}),
	start_date: date('start_date', {mode: 'string'}),
	end_date: date('end_date', {mode: 'string'}),
	is_default: boolean('is_default').default(false).notNull(),
	campaign_name: varchar('campaign_name').notNull(),
});

export const npcs = pgTable('npcs', {
	id: serial('id').primaryKey().notNull(),
	created_at: timestamp('created_at', {withTimezone: true, mode: 'string'})
		.defaultNow()
		.notNull(),
	user_id: uuid('user_id')
		.default(sql`auth.uid()`)
		.notNull()
		.references(() => users.id, {onDelete: 'set null'}),
	npc_name: varchar('npc_name').notNull(),
	description: text('description'),
	voice_id: bigint('voice_id', {mode: 'number'}).references(
		() => voice_clones.id,
		{
			onDelete: 'set null',
		}
	),
	is_default: boolean('is_default').default(false).notNull(),
});

export const audio_clips = pgTable(
	'audio_clips',
	{
		id: serial('id').primaryKey().notNull(),
		user_id: uuid('user_id')
			.default(sql`auth.uid()`)
			.notNull()
			.references(() => users.id, {onDelete: 'set null'}),
		created_at: timestamp('created_at', {withTimezone: true, mode: 'string'})
			.defaultNow()
			.notNull(),
		file_url: text('file_url').notNull(),
		original_file_name: text('original_file_name').notNull(),
		// You can use { mode: "bigint" } if numbers are exceeding js number limitations
		duration_seconds: bigint('duration_seconds', {mode: 'number'}).notNull(),
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

export const npc_dialogue_types = pgTable('npc_dialogue_types', {
	id: serial('id').primaryKey().notNull(),
	type_name: varchar('type_name', {length: 50}).notNull(),
	user_id: uuid('user_id')
		.default(sql`auth.uid()`)
		.notNull()
		.references(() => users.id, {onDelete: 'set null'}),
	is_default: boolean('is_default').default(false).notNull(),
});

export const campaign_npcs = pgTable(
	'campaign_npcs',
	{
		campaign_id: bigint('campaign_id', {mode: 'number'})
			.notNull()
			.references(() => campaigns.id, {onDelete: 'cascade'}),
		npc_id: bigint('npc_id', {mode: 'number'})
			.notNull()
			.references(() => npcs.id, {onDelete: 'cascade'}),
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

export const profiles = pgTable('profiles', {
	id: uuid('id')
		.primaryKey()
		.notNull()
		.references(() => users.id, {onDelete: 'cascade'}),
	updated_at: timestamp('updated_at', {withTimezone: true, mode: 'string'}),
	username: text('username').notNull(),
	full_name: text('full_name'),
	avatar_url: text('avatar_url'),
	website: text('website'),
});

export const voice_clones = pgTable('voice_clones', {
	id: serial('id').primaryKey().notNull(),
	user_id: uuid('user_id')
		.default(sql`auth.uid()`)
		.notNull()
		.references(() => users.id, {onDelete: 'set null'}),
	created_at: timestamp('created_at', {withTimezone: true, mode: 'string'})
		.defaultNow()
		.notNull(),
	clone_url: text('clone_url'),
	elevenlabs_voice_id: text('elevenlabs_voice_id'),
	status: text('status').notNull(),
	is_default: boolean('is_default').default(false).notNull(),
	voice_clone_name: varchar('voice_clone_name'),
});

export const npc_dialogues = pgTable('npc_dialogues', {
	dialogue_id: serial('dialogue_id').primaryKey().notNull(),
	npc_id: integer('npc_id').references(() => npcs.id),
	dialogue_type_id: integer('dialogue_type_id').references(
		() => npc_dialogue_types.id
	),
	text: text('text').notNull(),
	user_id: uuid('user_id').references(() => users.id),
	is_default: boolean('is_default').default(false).notNull(),
});

export const tts_audio = pgTable(
	'tts_audio',
	{
		id: serial('id').primaryKey().notNull(),
		created_at: timestamp('created_at', {withTimezone: true, mode: 'string'})
			.defaultNow()
			.notNull(),
		voice_id: bigint('voice_id', {mode: 'number'}).references(
			() => voice_clones.id,
			{
				onDelete: 'set null',
			}
		),
		user_id: uuid('user_id')
			.default(sql`auth.uid()`)
			.notNull()
			.references(() => users.id, {onDelete: 'set null'}),
		duration_seconds: bigint('duration_seconds', {mode: 'number'}).notNull(),
		source_text: text('source_text').notNull(),
		file_url: text('file_url').notNull(),
		is_default: boolean('is_default').default(false).notNull(),
		tts_audio_name: varchar('tts_audio_name').notNull(),
	},
	(table) => {
		return {
			tts_audio_file_url_key: unique('tts_audio_file_url_key').on(
				table.file_url
			),
		};
	}
);

export const voice_clone_clips = pgTable(
	'voice_clone_clips',
	{
		voice_clone_id: integer('voice_clone_id')
			.notNull()
			.references(() => voice_clones.id, {onDelete: 'cascade'}),
		audio_clip_id: integer('audio_clip_id')
			.notNull()
			.references(() => audio_clips.id, {onDelete: 'cascade'}),
	},
	(table) => {
		return {
			voice_clone_clips_pkey: primaryKey({
				columns: [table.voice_clone_id, table.audio_clip_id],
				name: 'voice_clone_clips_pkey',
			}),
		};
	}
);
