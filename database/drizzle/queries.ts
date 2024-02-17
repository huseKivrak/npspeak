import {CampaignsWithNPCs, NPCsWithCampaigns} from '@/types/drizzle';
import {npcs, campaigns, campaign_npcs} from '@/database/drizzle/schema';
import {db} from '.';
import {Tables} from '@/types/supabase';
import {eq} from 'drizzle-orm';
import {getUserFromSession} from '@/server-actions/auth';

/**
 * Retrieves campaigns and their associated NPCs for current user.
 *
 * The select operation currently does not specify columns,
 * so raw results also contain joined data from campaign_npcs table.
 *
 * This data is then processed to group campaigns with an array of their NPCs.
 */
export const getCampaignsAndNPCs = async (): Promise<
	CampaignsWithNPCs[] | null
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

		const campaignsWithNPCs: CampaignsWithNPCs[] = rawJoinRows.reduce(
			(acc, {campaigns, npcs}) => {
				let campaign = acc.find((c) => c.campaign.id === campaigns.id);
				if (!campaign) {
					campaign = {campaign: campaigns, npcs: []};
					acc.push(campaign);
				}
				if (npcs) campaign.npcs.push(npcs);
				return acc;
			},
			[] as CampaignsWithNPCs[]
		);
		console.log('groupedNPCs:', campaignsWithNPCs);
		return campaignsWithNPCs;
	} catch (error) {
		console.error('Error fetching campaigns:', error);
		throw new Error('An error occured while getting campaigns');
	}
};

export const getNPCsWithCampaignsAction = async (): Promise<
	NPCsWithCampaigns[] | null
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

		const npcsWithCampaigns: NPCsWithCampaigns[] = rawJoinRows.reduce(
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
