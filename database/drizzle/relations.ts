import { relations } from 'drizzle-orm/relations';
import {
  npcs,
  npc_dialogue_types,
  npc_dialogues,
  tts_audio,
  audio_clips,
  campaigns,
  voice_clones,
  products,
  prices,
  customers,
  profiles,
  subscriptions,
  campaign_npcs,
} from './schema';
import { authUsers as usersInAuth } from '../supabase/authSchema';

export const npcsRelations = relations(npcs, ({ one, many }) => ({
  usersInAuth: one(usersInAuth, {
    fields: [npcs.user_id],
    references: [usersInAuth.id],
  }),
  npc_dialogues: many(npc_dialogues),
  campaign_npcs: many(campaign_npcs),
}));

export const usersInAuthRelations = relations(usersInAuth, ({ many }) => ({
  npcs: many(npcs),
  npc_dialogues: many(npc_dialogues),
  npc_dialogue_types: many(npc_dialogue_types),
  tts_audios: many(tts_audio),
  audio_clips: many(audio_clips),
  campaigns: many(campaigns),
  voice_clones: many(voice_clones),
  customers: many(customers),
  profiles: many(profiles),
  subscriptions: many(subscriptions),
}));

export const npc_dialoguesRelations = relations(npc_dialogues, ({ one }) => ({
  npc_dialogue_type: one(npc_dialogue_types, {
    fields: [npc_dialogues.dialogue_type_id],
    references: [npc_dialogue_types.id],
  }),
  usersInAuth: one(usersInAuth, {
    fields: [npc_dialogues.user_id],
    references: [usersInAuth.id],
  }),
  npc: one(npcs, {
    fields: [npc_dialogues.npc_id],
    references: [npcs.id],
  }),
  tts_audio: one(tts_audio, {
    fields: [npc_dialogues.tts_audio_id],
    references: [tts_audio.id],
  }),
}));

export const npc_dialogue_typesRelations = relations(
  npc_dialogue_types,
  ({ one, many }) => ({
    npc_dialogues: many(npc_dialogues),
    usersInAuth: one(usersInAuth, {
      fields: [npc_dialogue_types.user_id],
      references: [usersInAuth.id],
    }),
  })
);

export const tts_audioRelations = relations(tts_audio, ({ one, many }) => ({
  npc_dialogues: many(npc_dialogues),
  usersInAuth: one(usersInAuth, {
    fields: [tts_audio.user_id],
    references: [usersInAuth.id],
  }),
}));

export const audio_clipsRelations = relations(audio_clips, ({ one }) => ({
  usersInAuth: one(usersInAuth, {
    fields: [audio_clips.user_id],
    references: [usersInAuth.id],
  }),
}));

export const campaignsRelations = relations(campaigns, ({ one, many }) => ({
  usersInAuth: one(usersInAuth, {
    fields: [campaigns.user_id],
    references: [usersInAuth.id],
  }),
  campaign_npcs: many(campaign_npcs),
}));

export const voice_clonesRelations = relations(voice_clones, ({ one }) => ({
  usersInAuth: one(usersInAuth, {
    fields: [voice_clones.user_id],
    references: [usersInAuth.id],
  }),
}));

export const pricesRelations = relations(prices, ({ one, many }) => ({
  product: one(products, {
    fields: [prices.product_id],
    references: [products.id],
  }),
  subscriptions: many(subscriptions),
}));

export const productsRelations = relations(products, ({ many }) => ({
  prices: many(prices),
}));

export const customersRelations = relations(customers, ({ one }) => ({
  usersInAuth: one(usersInAuth, {
    fields: [customers.id],
    references: [usersInAuth.id],
  }),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
  usersInAuth: one(usersInAuth, {
    fields: [profiles.id],
    references: [usersInAuth.id],
  }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  price: one(prices, {
    fields: [subscriptions.price_id],
    references: [prices.id],
  }),
  usersInAuth: one(usersInAuth, {
    fields: [subscriptions.user_id],
    references: [usersInAuth.id],
  }),
}));

export const campaign_npcsRelations = relations(campaign_npcs, ({ one }) => ({
  campaign: one(campaigns, {
    fields: [campaign_npcs.campaign_id],
    references: [campaigns.id],
  }),
  npc: one(npcs, {
    fields: [campaign_npcs.npc_id],
    references: [npcs.id],
  }),
}));
