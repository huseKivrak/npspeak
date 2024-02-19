'use server';
import {db} from '@/database/drizzle';
import {getUserFromSession} from '@/actions/auth';
import {campaigns} from '@/database/drizzle/schema';
import {eq, and} from 'drizzle-orm';
import {Tables} from '@/types/supabase';
import {State} from '@/types/drizzle';
import {
	campaignSchema,
	deleteCampaignSchema,
} from '@/database/drizzle/validation';
import {ZodError} from 'zod';
import {revalidatePath} from 'next/cache';

export const createCampaignAction = async (
	prevState: State,
	formData: FormData
): Promise<State> => {
	const user = await getUserFromSession();
	if (!user) throw new Error('You must be logged in to create campaigns.');

	const {campaign_name, description, start_date, end_date} =
		campaignSchema.parse(formData);
	const user_id = user.id;

	try {
		const insertedCampaign: Tables<'campaigns'>[] = await db
			.insert(campaigns)
			.values({
				user_id,
				campaign_name,
				description,
				start_date,
				end_date,
			})
			.returning();
		return {
			status: 'success',
			message: `The "${insertedCampaign[0].campaign_name}" campaign is created`,
		};
	} catch (error) {
		if (error instanceof ZodError) {
			return {
				status: 'error',
				message: 'Invalid form data',
				errors: error.issues.map((issue) => ({
					path: issue.path.join('.'),
					message: `${issue.message}`,
				})),
			};
		}
		return {
			status: 'error',
			message: 'An error occured during campaign creation.',
		};
	}
};

export const deleteCampaignAction = async (
	prevState: State,
	formData: FormData
): Promise<State> => {
	const user = await getUserFromSession();
	if (!user) throw new Error('You must be logged in to delete campaigns.');

	const {campaign_id} = deleteCampaignSchema.parse(formData);
	const user_id = user.id;
	console.log('campaign_id', campaign_id);
	try {
		const deletedCampaign = await db
			.delete(campaigns)
			.where(and(eq(campaigns.id, campaign_id), eq(campaigns.user_id, user_id)))
			.returning();

		return {
			status: 'success',
			message: `${deletedCampaign[0].campaign_name} has been deleted`,
		};
	} catch (error) {
		return {
			status: 'error',
			message: 'An error occured while deleting campaign.',
		};
	}
};
