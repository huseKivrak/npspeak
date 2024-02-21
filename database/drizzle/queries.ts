import {CampaignWithNPCs, NPCWithCampaigns} from '@/types/drizzle';
import {
	npcs,
	campaigns,
	campaign_npcs,
	npc_dialogue_types,
} from '@/database/drizzle/schema';
import {db} from '.';
import {Tables} from '@/types/supabase';
import {eq, and} from 'drizzle-orm';
import {getUserFromSession} from '@/actions/auth';

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
	const user = await getUserFromSession();
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
			(acc, {campaigns, npcs}) => {
				let campaign = acc.find((c) => c.campaign.id === campaigns.id);
				if (!campaign) {
					campaign = {campaign: campaigns, npcs: []};
					acc.push(campaign);
				}
				if (npcs) campaign.npcs.push(npcs);
				return acc;
			},
			[] as CampaignWithNPCs[]
		);
		console.log('groupedNPCs:', campaignsWithNPCs);
		return campaignsWithNPCs;
	} catch (error) {
		console.error('Error fetching campaigns:', error);
		throw new Error('An error occured while getting campaigns');
	}
};

export const getCampaignById = async (id: string) => {
	const user = await getUserFromSession();
	if (!user) return null;
	const userId = user.id;

	const campaignId = parseInt(id);
	if (isNaN(campaignId)) return null;

	try {
		const campaign = await db
			.select()
			.from(campaigns)
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
export const getNPCsWithCampaigns = async (): Promise<
	NPCWithCampaigns[] | null
> => {
	const user = await getUserFromSession();
	if (!user) return null;

	try {
		const rawJoinRows = await db
			.select()
			.from(npcs)
			.leftJoin(campaign_npcs, eq(npcs.id, campaign_npcs.npc_id))
			.leftJoin(campaigns, eq(campaigns.id, campaign_npcs.campaign_id))
			.where(eq(npcs.user_id, user.id));

		const npcsWithCampaigns: NPCWithCampaigns[] = rawJoinRows.reduce(
			(acc, {npcs, campaigns}) => {
				let npc = acc.find((entry) => entry.npc.id === npcs.id);
				if (!npc) {
					npc = {npc: npcs, campaigns: []};
					acc.push(npc);
				}
				if (campaigns) npc.campaigns.push(campaigns);
				return acc;
			},
			[] as {
				npc: Tables<'npcs'>;
				campaigns: Tables<'campaigns'>[];
			}[]
		);

		return npcsWithCampaigns;
	} catch (error) {
		console.error('Error fetching NPCS:', error);
		throw new Error('An error occured while getting NPCs');
	}
};

export const getNPCById = async (id: string) => {
	const user = await getUserFromSession();
	if (!user) return null;
	const userId = user.id;

	const npcId = parseInt(id);
	if (isNaN(npcId)) return null;

	try {
		const npc = await db
			.select()
			.from(npcs)
			.where(and(eq(npcs.id, npcId), eq(npcs.user_id, userId)));

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
