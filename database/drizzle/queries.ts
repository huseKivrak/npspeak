import 'server-only';

import { ActionStatus, CampaignWithNPCs, DetailedNPC } from '@/types/drizzle';
import {
  npcs,
  campaigns,
  campaign_npcs,
  npc_dialogue_types,
  npc_dialogues,
  tts_audio,
  profiles,
} from '@/database/drizzle/schema';
import { db } from '.';
import { eq, and } from 'drizzle-orm';
import { getUserInfo } from '@/actions/auth';
import { DetailedDialogue } from '@/types/drizzle';
import { PgSelect } from 'drizzle-orm/pg-core';
/**
 * @param campaignId Optional: Returns all user campaigns if not provided
 * @returns CampaignWithNPCs | CampaignWithNPCs[] | {status: string; message: string}
 */
export const getCampaignsWithNPCs = async (
  campaignId?: number
): Promise<ActionStatus> => {
  const { user } = await getUserInfo();
  if (!user)
    return {
      status: 'error',
      message: 'Unauthorized',
    };

  function withCampaignId<T extends PgSelect>(qb: T, campaignId: number) {
    return qb.where(eq(campaigns.id, campaignId));
  }

  try {
    let campaignQuery = db
      .select()
      .from(campaigns)
      .leftJoin(campaign_npcs, eq(campaigns.id, campaign_npcs.campaign_id))
      .leftJoin(npcs, eq(npcs.id, campaign_npcs.npc_id))
      .where(eq(campaigns.user_id, user.id))
      .$dynamic();

    campaignQuery = campaignId
      ? withCampaignId(campaignQuery, campaignId)
      : campaignQuery;

    const rows = await campaignQuery;

    const campaignData: CampaignWithNPCs[] = rows.reduce((acc, row) => {
      let campaign = acc.find((entry) => entry.id === row.campaigns.id);
      if (!campaign) {
        campaign = {
          ...row.campaigns,
          npcs: row.npcs ? [row.npcs] : [],
        };
        acc.push(campaign);
      } else {
        if (row.npcs) {
          campaign.npcs.push(row.npcs);
        }
      }
      return acc;
    }, [] as CampaignWithNPCs[]);

    const data =
      campaignId && campaignData.length ? campaignData[0] : campaignData;
    return {
      status: 'success',
      data,
    };
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return {
      status: 'error',
      message: `Error fetching campaigns: ${error}`,
    };
  }
};

///////////////////////////////////////////////////
/// NPCs
///////////////////////////////////////////////////

/**
 *
 * @param npcId Optional: Returns all user NPCs if not provided
 * @returns DetailedNPC | DetailedNPC[] | {status: string; message: string}
 */
export const getNPCsWithRelatedData = async (
  npcId?: number
): Promise<ActionStatus> => {
  const { user } = await getUserInfo();
  if (!user)
    return {
      status: 'error',
      message: 'Unauthenticated',
    };

  function withNPCId<T extends PgSelect>(qb: T, npcId: number) {
    return qb.where(eq(npcs.id, npcId));
  }

  try {
    let npcQuery = db
      .select()
      .from(npcs)
      .leftJoin(campaign_npcs, eq(npcs.id, campaign_npcs.npc_id))
      .leftJoin(campaigns, eq(campaigns.id, campaign_npcs.campaign_id))
      .leftJoin(npc_dialogues, eq(npcs.id, npc_dialogues.npc_id))
      .where(eq(npcs.user_id, user.id))
      .$dynamic();

    npcQuery = npcId ? withNPCId(npcQuery, npcId) : npcQuery;

    const rows = await npcQuery;

    if (rows.length === 0)
      return {
        status: 'error',
        message: 'NPC not found',
      };

    const npcData: DetailedNPC[] = rows.reduce((acc, row) => {
      let npc = acc.find((entry) => entry.id === row.npcs.id);
      if (!npc) {
        npc = {
          ...row.npcs,
          campaigns: row.campaigns ? [row.campaigns] : [],
          dialogues: row.npc_dialogues ? [row.npc_dialogues] : [],
        };
        acc.push(npc);
      } else {
        if (
          row.campaigns &&
          !npc.campaigns.find((campaign) => campaign.id === row.campaigns?.id)
        ) {
          npc.campaigns.push(row.campaigns);
        }
        if (
          row.npc_dialogues &&
          !npc.dialogues.find(
            (dialogue) => dialogue.id === row.npc_dialogues?.id
          )
        ) {
          npc.dialogues.push(row.npc_dialogues);
        }
      }
      return acc;
    }, [] as DetailedNPC[]);

    const data = npcId && npcData.length ? npcData[0] : npcData;
    return {
      status: 'success',
      data,
    };
  } catch (error) {
    console.error('Error fetching NPC:', error);
    return {
      status: 'error',
      message: `Error fetching NPC: ${error}`,
    };
  }
};

/**
 * Fetches detailed dialogue data for given NPC
 *
 * @param npcId
 * @returns DetailedDialogue[] | {status: string; message: string}
 */
export const getDetailedDialogues = async (
  npcId: number
): Promise<ActionStatus> => {
  const { user } = await getUserInfo();
  if (!user) {
    return {
      status: 'error',
      message: 'Unauthenticated',
    };
  }
  try {
    const rows: DetailedDialogue[] = await db
      .select({
        id: npc_dialogues.id,
        npc_id: npc_dialogues.npc_id,
        user_id: npc_dialogues.user_id,
        text: npc_dialogues.text,
        dialogueType: npc_dialogue_types.type_name,
        audioFileKey: tts_audio.file_url,
        audioDuration: tts_audio.duration_seconds,
      })
      .from(npc_dialogues)
      .leftJoin(tts_audio, eq(npc_dialogues.tts_audio_id, tts_audio.id))
      .leftJoin(
        npc_dialogue_types,
        eq(npc_dialogues.dialogue_type_id, npc_dialogue_types.id)
      )
      .where(eq(npc_dialogues.npc_id, npcId));
    return {
      status: 'success',
      data: rows,
    };
  } catch (error) {
    console.error('Error fetching detailed dialogues: ', error);
    return {
      status: 'error',
      message: `Error fetching detailed dialogues: ${error}`,
    };
  }
};

export const isExistingEmail = async (email: string): Promise<boolean> => {
  const exisitingEmail = await db.query.profiles.findFirst({
    where: eq(profiles.email, email),
  });
  return !!exisitingEmail;
};
