'use server';
import {redirect} from 'next/navigation';
import {db} from '../database/drizzle';
import {getUserFromSession, getUsername} from '@/server-actions/auth';
import {campaigns, npcs, campaign_npcs} from '../database/drizzle/schema';
import {
	insertCampaignSchema,
	insertNPCSchema,
} from '../database/drizzle/schema';
import {ZodError} from 'zod';
import {revalidatePath} from 'next/cache';
import {eq} from 'drizzle-orm';
import {Tables} from '@/types/supabase';

type RawJoinData = {
	campaigns: Tables<'campaigns'>;
	npcs: Tables<'npcs'>;
	campaign_npcs: Tables<'campaign_npcs'>;
};

export type CampaignsWithNPCs = {
	campaign: RawJoinData['campaigns'];
	npcs: RawJoinData['npcs'][];
};

export type NPCsWithCampaigns = {
	npc: RawJoinData['npcs'];
	campaigns: RawJoinData['campaigns'][];
};

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
			[] as {
				campaign: RawJoinData['campaigns'];
				npcs: RawJoinData['npcs'][];
			}[]
		);
		console.log('groupedNPCs:', campaignsWithNPCs);
		return campaignsWithNPCs;
	} catch (error) {
		//todo: handle error
		console.error('Error fetching campaigns and NPCS:', error);
		return null;
	}
};

//Inserts campaigns into db and redirects to its detail page
export const createCampaignAction = async (
	prevState: any,
	formData: FormData
) => {
	const user = await getUserFromSession();
	if (!user) redirect('/');

	const username = getUsername(user);

	let newCampaignId: number;
	const campaign_name = formData.get('campaign_name');
	const description = formData.get('description');
	const start_date = formData.get('start_date');
	const end_date = formData.get('end_date');

	try {
		const validatedData = insertCampaignSchema.parse({
			user_id: user.id,
			// is_default: false,
			campaign_name,
			description,
			start_date: start_date === '' ? null : start_date, //for weird date type errors
			end_date: end_date === '' ? null : end_date,
		});

		const insertedCampaignId = await db
			.insert(campaigns)
			.values(validatedData)
			.returning({id: campaigns.id});
		newCampaignId = insertedCampaignId[0].id;
	} catch (error: any) {
		return error instanceof ZodError
			? {zodError: error.errors}
			: {message: error.message};
	}

	//* must be outside try/catch:
	revalidatePath(`/${username}/campaigns`);
	redirect(`/${username}/campaigns/${newCampaignId}`);
};

export const getNPCsAction = async (): Promise<NPCsWithCampaigns[] | null> => {
	const user = await getUserFromSession();
	if (!user) return null;
	const userId = user.id;

	const rawJoinRows = await db
		.select()
		.from(npcs)
		.leftJoin(campaign_npcs, eq(npcs.id, campaign_npcs.npc_id))
		.leftJoin(campaigns, eq(campaigns.id, campaign_npcs.campaign_id))
		.where(eq(npcs.user_id, userId));
	console.log('NPCS::', rawJoinRows);

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
			npc: RawJoinData['npcs'];
			campaigns: RawJoinData['campaigns'][];
		}[]
	);

	console.log('FINAL RESULT:', npcsWithCampaigns);
	return npcsWithCampaigns;
};

//Inserts NPCs into db then redirects to its detail page
export const createNPCAction = async (prevState: any, formData: FormData) => {
	const user = await getUserFromSession();
	if (!user) redirect('/');

	const username = getUsername(user);
	let newNPCId;

	try {
		const npc_name = formData.get('npc_name');
		const description = formData.get('description');

		const validatedData = insertNPCSchema.parse({
			npc_name,
			description,
			user_id: user.id,
		});

		const insertedNPCId = await db
			.insert(npcs)
			.values(validatedData)
			.returning({id: npcs.id});
		newNPCId = insertedNPCId[0].id;
	} catch (error: any) {
		if (error instanceof ZodError) return {zodError: error.errors};
		return {message: error.message};
	}
	revalidatePath(`/${username}/npcs/`);
	redirect(`/${username}/npcs/${newNPCId}`);
};
