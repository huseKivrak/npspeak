'use server';
import {redirect} from 'next/navigation';
import {db} from '.';
import {getUserFromSession, getUsername} from '@/utils/supabase/helpers';
import {campaigns, npcs, campaign_npcs} from './schema';
import {insertCampaignSchema, insertNPCSchema} from './schema';
import {ZodError} from 'zod';
import {revalidatePath} from 'next/cache';
import {eq} from 'drizzle-orm';
import {Tables} from '@/types/supabase';

type RawCampaignJoinData = {
	campaigns: Tables<'campaigns'>;
	npcs: Tables<'npcs'>;
	campaign_npcs: Tables<'campaign_npcs'>;
};

type CampaignsWithNPCsArray = {
	campaign: RawCampaignJoinData['campaigns'];
	npcs: RawCampaignJoinData['npcs'][];
}[];

/**
 * Retrieves campaigns and their associated NPCs for current user.
 *
 * The select operation currently does not specify columns,
 * so raw results also contain joined data from campaign_npcs table.
 *
 * This data is then processed to group campaigns with an array of their NPCs.
 */
export const getCampaignsAndNPCs =
	async (): Promise<CampaignsWithNPCsArray | null> => {
		const user = await getUserFromSession();
		if (!user) return null;

		const userId = user.id;

		try {
			const rawJoinedData: RawCampaignJoinData[] = await db
				.select()
				.from(campaigns)
				.innerJoin(campaign_npcs, eq(campaigns.id, campaign_npcs.campaign_id))
				.innerJoin(npcs, eq(npcs.id, campaign_npcs.npc_id))
				.where(eq(campaigns.user_id, userId));

			const campaignsWithNPCs: CampaignsWithNPCsArray = rawJoinedData.reduce(
				(acc, {campaigns, npcs}) => {
					let campaign = acc.find((c) => c.campaign.id === campaigns.id);
					if (!campaign) {
						campaign = {campaign: campaigns, npcs: []};
						acc.push(campaign);
					}
					campaign.npcs.push(npcs);
					return acc;
				},
				[] as {
					campaign: RawCampaignJoinData['campaigns'];
					npcs: RawCampaignJoinData['npcs'][];
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
