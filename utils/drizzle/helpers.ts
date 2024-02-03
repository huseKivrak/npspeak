'use server';

import {getUserFromSession} from '../supabase/helpers';
import {db} from '@/database/drizzle';
import {campaigns, npcs, campaign_npcs} from '@/database/drizzle/schema';
import {eq} from 'drizzle-orm';

type RawResults = {
	campaigns: {
		id: number;
		created_at: string;
		user_id: string | null;
		description: string | null;
		updated_at: string | null;
		start_date: string | null;
		end_date: string | null;
		is_default: boolean;
		campaign_name: string;
	};
	campaign_npcs: {
		campaign_id: number;
		npc_id: number;
	};
	npcs: {
		id: number;
		created_at: string;
		user_id: string | null;
		npc_name: string;
		description: string | null;
		voice_id: number | null;
		is_default: boolean;
	};
}[];

export const getCampaignsAndNPCs = async () => {
	const user = await getUserFromSession();
	if (!user) return null;

	const userId = user.id;

	const rawResult: RawResults = await db
		.select()
		.from(campaigns)
		.innerJoin(campaign_npcs, eq(campaigns.id, campaign_npcs.campaign_id))
		.innerJoin(npcs, eq(npcs.id, campaign_npcs.npc_id))
		.where(eq(campaigns.user_id, userId));

	const groupedResults = rawResult.reduce((acc, {campaigns, npcs}) => {
		let campaign = acc.find((c) => c.campaign.id === campaigns.id);
		if (!campaign) {
			campaign = {campaign: campaigns, npcs: []};
			acc.push(campaign);
		}
		campaign.npcs.push(npcs);
		return acc;
	}, [] as {campaign: RawResults[0]['campaigns']; npcs: RawResults[0]['npcs'][]}[]);
	console.log('groupedNPCs:', groupedResults);
	return groupedResults;
};

export type GroupedResults = {
	campaign: RawResults[0]['campaigns'];
	npcs: RawResults[0]['npcs'][];
}[];
