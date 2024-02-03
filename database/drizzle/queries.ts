'use server';
import {redirect} from 'next/navigation';
import {db} from '.';
import {getUserFromSession, getUsername} from '@/utils/supabase/helpers';
import {campaigns, npcs} from './schema';
import {insertCampaignSchema, insertNPCSchema} from './schema';
import {ZodError} from 'zod';
import {revalidatePath} from 'next/cache';

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
