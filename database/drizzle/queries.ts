import 'server-only';

import {CampaignWithNPCs, DetailedNPC} from '@/types/drizzle';
import {
	npcs,
	campaigns,
	campaign_npcs,
	npc_dialogue_types,
	npc_dialogues,
} from '@/database/drizzle/schema';
import {db} from '.';
import {eq, and} from 'drizzle-orm';
import {getUserInfo} from '@/actions/auth';
import {Tables} from '@/types/supabase';

/**
 * Retrieves campaigns and their associated NPCs for current user.
 *
 * The select operation currently does not specify columns,
 * so raw results also contain joined data from campaign_npcs table.
 *
 * This data is then processed to group campaigns with an array of their NPCs.
 */
export const getCampaignsWithNPCs = async (): Promise<
	CampaignWithNPCs[] | null
> => {
	const {user} = await getUserInfo();
	if (!user) return null;

	const userId = user.id;

	try {
		const rawJoinRows = await db
			.select()
			.from(campaigns)
			.leftJoin(campaign_npcs, eq(campaigns.id, campaign_npcs.campaign_id))
			.leftJoin(npcs, eq(npcs.id, campaign_npcs.npc_id))
			.where(eq(campaigns.user_id, userId));

		const campaignsWithNPCs: CampaignWithNPCs[] = rawJoinRows.reduce(
			(acc, row) => {
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
			},
			[] as CampaignWithNPCs[]
		);
		return campaignsWithNPCs;
	} catch (error) {
		console.error('Error fetching campaigns:', error);
		throw new Error('An error occured while getting campaigns');
	}
};

export const getCampaignById = async (id: string) => {
	const {user} = await getUserInfo();
	if (!user) return null;
	const userId = user.id;

	const campaignId = parseInt(id);
	if (isNaN(campaignId)) return null;

	try {
		const campaign = await db
			.select()
			.from(campaigns)
			.leftJoin(campaign_npcs, eq(campaigns.id, campaign_npcs.campaign_id))
			.where(and(eq(campaigns.id, campaignId), eq(campaigns.user_id, userId)));

		return campaign;
	} catch (error) {
		console.error('Error fetching campaign:', error);
		throw new Error('An error occured while getting campaign');
	}
};

///////////////////////////////////////////////////
/// NPCs
///////////////////////////////////////////////////
/**
 * Retrieves all user NPCs and their associated campaigns and dialogues.
 *
 * @returns DetailedNPC[] | null
 */
export const getNPCsWithRelatedData = async (): Promise<
	DetailedNPC[] | null
> => {
	const {user} = await getUserInfo();
	if (!user) return null;

	try {
		const rawJoinRows = await db
			.select()
			.from(npcs)
			.leftJoin(campaign_npcs, eq(npcs.id, campaign_npcs.npc_id))
			.leftJoin(campaigns, eq(campaigns.id, campaign_npcs.campaign_id))
			.leftJoin(npc_dialogues, eq(npcs.id, npc_dialogues.npc_id))
			.where(eq(npcs.user_id, user.id));

		if (rawJoinRows.length === 0) return null;

		const transformedNPCs: DetailedNPC[] = rawJoinRows.reduce((acc, row) => {
			let npc = acc.find((entry) => entry.id === row.npcs.id);
			if (!npc) {
				npc = {
					...row.npcs,
					campaigns: row.campaigns ? [row.campaigns] : [],
					dialogues: row.npc_dialogues ? [row.npc_dialogues] : [],
				};
				acc.push(npc);
			} else {
				if (row.campaigns) {
					npc.campaigns.push(row.campaigns);
				}
				if (row.npc_dialogues) {
					npc.dialogues.push(row.npc_dialogues);
				}
			}
			return acc;
		}, [] as DetailedNPC[]);

		return transformedNPCs;
	} catch (error) {
		//todo: handle errors
		console.error('Error fetching NPCS:', error);
		return null;
	}
};

export const getNPCById = async (
	npcId: number
): Promise<DetailedNPC | null> => {
	const {user} = await getUserInfo();
	if (!user) return null;
	const userId = user.id;
	try {
		const rawJoinRows = await db
			.select()
			.from(npcs)
			.leftJoin(campaign_npcs, eq(npcs.id, campaign_npcs.npc_id))
			.leftJoin(campaigns, eq(campaigns.id, campaign_npcs.campaign_id))
			.leftJoin(npc_dialogues, eq(npcs.id, npc_dialogues.npc_id))
			.where(and(eq(npcs.id, npcId), eq(npcs.user_id, userId)));

		if (rawJoinRows.length === 0) return null;

		const npc = rawJoinRows.reduce((acc, row) => {
			if (!acc.id) {
				acc = {
					...row.npcs,
					campaigns: row.campaigns ? [row.campaigns] : [],
					dialogues: row.npc_dialogues ? [row.npc_dialogues] : [],
				};
			}
			if (
				row.campaigns &&
				!acc.campaigns.find((campaign) => campaign.id === row.campaigns?.id)
			) {
				acc.campaigns.push(row.campaigns);
			}
			if (
				row.npc_dialogues &&
				!acc.dialogues.find((dialogue) => dialogue.id === row.npc_dialogues?.id)
			) {
				acc.dialogues.push(row.npc_dialogues);
			}
			return acc;
		}, {} as DetailedNPC);

		return npc;
	} catch (error) {
		console.error('Error fetching NPC:', error);
		throw new Error('An error occured while getting NPC');
	}
};

export const getDialogueTypes = async () => {
	try {
		const dialogueTypes = await db.select().from(npc_dialogue_types);
		return dialogueTypes;
	} catch (error) {
		console.error('Error fetching dialogue types:', error);
		throw new Error('An error occured while getting dialogue types');
	}
};
