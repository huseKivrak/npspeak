import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  json,
  boolean,
  text,
  smallint,
  pgSchema,
} from 'drizzle-orm/pg-core'
export const authSchema = pgSchema('auth')

/**
 * The built-in auth.users table from Supabase,
 * introspected for FKs in other tables.
 *
 * Will be removed if/when profiles.id replaces auth.users.id
 * */
export const authUsers = authSchema.table('users', {
  id: uuid('id').primaryKey(),
  instance_id: uuid('instance_id'),
  aud: varchar('aud', { length: 255 }),
  role: varchar('role', { length: 255 }),
  email: varchar('email', { length: 255 }),
  encrypted_password: varchar('encrypted_password', { length: 255 }),
  email_confirmed_at: timestamp('email_confirmed_at'),
  invited_at: timestamp('invited_at'),
  confirmation_token: varchar('confirmation_token', { length: 255 }),
  confirmation_sent_at: timestamp('confirmation_sent_at'),
  recovery_token: varchar('recovery_token', { length: 255 }),
  recovery_sent_at: timestamp('recovery_sent_at'),
  email_change_token_new: varchar('email_change_token_new', { length: 255 }),
  email_change: varchar('email_change', { length: 255 }),
  email_change_sent_at: timestamp('email_change_sent_at'),
  last_sign_in_at: timestamp('last_sign_in_at'),
  raw_app_meta_data: json('raw_app_meta_data'),
  raw_user_meta_data: json('raw_user_meta_data'),
  is_super_admin: boolean('is_super_admin'), // Change 'is_super_admin' to boolean
  created_at: timestamp('created_at'),
  updated_at: timestamp('updated_at'),
  phone: text('phone'), // Change 'phone' to text
  phone_confirmed_at: timestamp('phone_confirmed_at'),
  phone_change: text('phone_change'), // Change 'phone_change' to text
  phone_change_token: varchar('phone_change_token', { length: 255 }),
  phone_change_sent_at: timestamp('phone_change_sent_at'),
  confirmed_at: timestamp('confirmed_at'),
  email_change_token_current: varchar('email_change_token_current', {
    length: 255,
  }),
  email_change_confirm_status: smallint('email_change_confirm_status'),
  banned_until: timestamp('banned_until'),
  reauthentication_token: varchar('reauthentication_token', { length: 255 }),
  reauthentication_sent_at: timestamp('reauthentication_sent_at'),
  is_sso_user: boolean('is_sso_user').notNull(), // Change 'is_sso_user' to boolean
  deleted_at: timestamp('deleted_at'),
})
