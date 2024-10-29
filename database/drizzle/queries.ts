import {
  ActionStatus,
  CampaignWithDetailedNPCs,
  DetailedDialogue,
  DetailedNPC,
} from '@/types/drizzle';
import {
  npcs,
  campaigns,
  npc_dialogues,
  profiles,
} from '@/database/drizzle/schema';
import { db } from '.';
import { and, eq } from 'drizzle-orm';
import { findVoicesByIds } from '@/config/server/voiceDataHelpers';

/**
 * Fetch NPC with related campaigns and dialogues.
 *
 * @param userId
 * @param npcId
 * @returns
 */
export const getDetailedNPC = async (
  userId: string,
  npcId: number
): Promise<ActionStatus<DetailedNPC>> => {
  try {
    //Fetch NPC with related dialogues and campaigns
    const npcData = await db.query.npcs.findFirst({
      where: and(eq(npcs.user_id, userId), eq(npcs.id, npcId)),
      with: {
        campaign_npcs: {
          with: {
            campaign: true,
          },
        },
        npc_dialogues: true,
      },
    });

    if (!npcData) {
      return {
        status: 'error',
        message: 'No NPCs found',
      };
    }

    const voiceMap = await findVoicesByIds([npcData.voice_id]);
    const voice = voiceMap[npcData.voice_id];

    //Process NPC to include campaigns and voice data
    const detailedNPC: DetailedNPC = {
      ...npcData,
      dialogues: npcData.npc_dialogues,
      campaigns: npcData.campaign_npcs
        .map((cn) => cn.campaign)
        .filter((c) => c !== undefined),
      voice,
    };

    return {
      status: 'success',
      data: detailedNPC,
    };
  } catch (error) {
    console.error('Error fetching Detailed NPC:', error);
    return {
      status: 'error',
      message: `Error fetching Detailed NPC: ${error}`,
    };
  }
};

/**
 * Fetches all user NPCs with related campaigns and dialogues.
 *
 * @param userId
 * @returns
 */
export const getAllDetailedNPCs = async (
  userId: string
): Promise<ActionStatus<DetailedNPC[]>> => {
  try {
    const npcsData = await db.query.npcs.findMany({
      where: eq(npcs.user_id, userId),
      with: {
        campaign_npcs: {
          with: {
            campaign: true,
          },
        },
        npc_dialogues: true,
      },
    });

    if (!npcsData || npcsData.length === 0) {
      return {
        status: 'error',
        message: 'No NPCs found',
      };
    }

    const voiceIds = Array.from(new Set(npcsData.map((npc) => npc.voice_id)));
    const voiceMap = await findVoicesByIds(voiceIds);

    // Process each NPC to include campaigns and voice data
    const detailedNPCs: DetailedNPC[] = npcsData.map((npcData) => {
      const voice = voiceMap[npcData.voice_id];
      const relatedCampaigns = npcData.campaign_npcs
        .map((cn) => cn.campaign)
        .filter((c) => c !== undefined);

      return {
        ...npcData,
        dialogues: npcData.npc_dialogues,
        campaigns: relatedCampaigns,
        voice,
      };
    });

    return {
      status: 'success',
      data: detailedNPCs,
    };
  } catch (error) {
    console.error('Error fetching all NPCs:', error);
    return {
      status: 'error',
      message: `Error fetching all NPCs: ${error}`,
    };
  }
};

/**
 * Fetches all campaigns for a user.
 *
 * @param userId
 * @returns
 */
export const getAllCampaigns = async (
  userId: string
): Promise<ActionStatus<(typeof campaigns.$inferSelect)[]>> => {
  try {
    const userCampaigns = await db.query.campaigns.findMany({
      where: eq(campaigns.user_id, userId),
    });

    if (!userCampaigns || userCampaigns.length === 0) {
      return {
        status: 'error',
        message: 'No campaigns found',
      };
    }

    return {
      status: 'success',
      data: userCampaigns,
    };
  } catch (error) {
    console.error('Error fetching user campaigns:', error);
    return {
      status: 'error',
      message: `Error fetching user campaigns: ${error}`,
    };
  }
};

/**
 * Fetches a campaign with related NPCs.
 *
 * @param userId
 * @param campaignId
 * @returns
 */
export const getCampaignWithDetailedNPCs = async (
  userId: string,
  campaignId: number
): Promise<ActionStatus<CampaignWithDetailedNPCs>> => {
  try {
    const campaignData = await db.query.campaigns.findFirst({
      where: and(eq(campaigns.id, campaignId), eq(campaigns.user_id, userId)),
      with: {
        campaign_npcs: {
          with: {
            npc: {
              with: {
                npc_dialogues: true,
                campaign_npcs: {
                  with: {
                    campaign: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!campaignData) {
      return {
        status: 'error',
        message: 'Campaign not found',
      };
    }

    const voiceIds = Array.from(
      new Set(campaignData.campaign_npcs.map((cn) => cn.npc.voice_id))
    );
    const voiceMap = await findVoicesByIds(voiceIds);

    // Transform NPCs to include dialogues, campaigns, and voice
    const detailedNPCs: DetailedNPC[] = campaignData.campaign_npcs.map((cn) => {
      const voice = voiceMap[cn.npc.voice_id];

      return {
        ...cn.npc,
        dialogues: cn.npc.npc_dialogues,
        campaigns: cn.npc.campaign_npcs.map((c) => c.campaign),
        voice,
      };
    });

    const campaign: CampaignWithDetailedNPCs = {
      ...campaignData,
      npcs: detailedNPCs,
    };

    return {
      status: 'success',
      data: campaign,
    };
  } catch (error) {
    console.error('Error fetching campaign with NPCs:', error);
    return {
      status: 'error',
      message: `Error fetching campaign with NPCs: ${error}`,
    };
  }
};

/**
 * Fetches all campaigns with related NPCs.
 *
 * @param userId
 * @returns
 */
export const getAllCampaignsWithDetailedNPCs = async (
  userId: string
): Promise<ActionStatus<CampaignWithDetailedNPCs[]>> => {
  try {
    const rows = await db.query.campaigns.findMany({
      where: eq(campaigns.user_id, userId),
      with: {
        campaign_npcs: {
          with: {
            npc: {
              with: {
                npc_dialogues: true,
                campaign_npcs: {
                  with: {
                    campaign: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const voiceIds = Array.from(
      new Set(
        rows.flatMap((row) => row.campaign_npcs.map((cn) => cn.npc.voice_id))
      )
    );
    const voiceMap = await findVoicesByIds(voiceIds);

    const campaignsWithNPCs = rows.map((row) => {
      return {
        ...row,
        npcs: row.campaign_npcs.map((cn) => {
          const voice = voiceMap[cn.npc.voice_id];

          return {
            ...cn.npc,
            dialogues: cn.npc.npc_dialogues,
            campaigns: cn.npc.campaign_npcs.map((c) => c.campaign),
            voice,
          };
        }),
      };
    });

    return {
      status: 'success',
      data: campaignsWithNPCs,
    };
  } catch (error) {
    console.error('Error fetching campaigns with NPCs:', error);
    return {
      status: 'error',
      message: `Error fetching campaigns with NPCs: ${error}`,
    };
  }
};

/**
 * Fetches an NPC's dialogues with related audio and dialogue type.
 *
 * @param userId
 * @param npcId
 * @returns
 */
export const getDetailedDialoguesByNPCId = async (
  userId: string,
  npcId: number
): Promise<ActionStatus<DetailedDialogue[]>> => {
  try {
    const rows = await db.query.npc_dialogues.findMany({
      where: and(
        eq(npc_dialogues.npc_id, npcId),
        eq(npc_dialogues.user_id, userId)
      ),
      with: {
        tts_audio: {
          columns: {
            file_url: true,
            duration_seconds: true,
          },
        },
        npc_dialogue_type: true,
      },
    });

    const dialogues: DetailedDialogue[] = rows.map((row) => ({
      ...row,
      audioFileKey: row.tts_audio?.file_url,
      dialogueType: row.npc_dialogue_type.type_name,
      audioDuration: row.tts_audio?.duration_seconds,
    }));

    return {
      status: 'success',
      data: dialogues,
    };
  } catch (error) {
    console.error('Error fetching detailed dialogues:', error);
    return {
      status: 'error',
      message: `Error fetching detailed dialogues: ${error}`,
    };
  }
};

/**
 * Checks if an email address is already associated with a profile
 *
 * @param emailAddress - The email address to check
 * @returns A boolean indicating whether the email address is in use.
 */
export const isExistingEmailAddress = async (
  emailAddress: string
): Promise<boolean> => {
  const exisitingEmail = await db.query.profiles.findFirst({
    where: eq(profiles.email, emailAddress),
  });
  return !!exisitingEmail;
};
