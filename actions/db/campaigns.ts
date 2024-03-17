'use server';
import {db} from '@/database/drizzle';
import {getUserInfo} from '../auth';
import {campaigns, campaign_npcs} from '@/database/drizzle/schema';
import {eq, and} from 'drizzle-orm';
import {Tables} from '@/types/supabase';
import {ActionStatus} from '@/types/drizzle';
import {
	campaignSchema,
	deleteCampaignSchema,
} from '@/database/drizzle/validation';
import {ZodError} from 'zod';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';

export const createCampaignAction = async (
	prevState: ActionStatus,
	formData: FormData
): Promise<ActionStatus> => {
	const {user} = await getUserInfo();
	if (!user) return {status: 'error', message: 'Unauthenticated'};

	const user_id = user.id;
	let newCampaignId: number | null = null;

	try {
		const {campaign_name, description, npc_ids, start_date, end_date} =
			campaignSchema.parse(formData);
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

		if (npc_ids && npc_ids.length > 0) {
			const associations = npc_ids.map((npc_id) => ({
				npc_id: npc_id as number, //safe type assertion after Zod validation
				campaign_id: insertedCampaign[0].id,
			}));
			await db.insert(campaign_npcs).values(associations);
		}

		newCampaignId = insertedCampaign[0].id;
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
	revalidatePath('/');
	redirect(`/${user.username}/campaigns/${newCampaignId}`);
};

export const deleteCampaignAction = async (
	prevState: ActionStatus,
	formData: FormData
): Promise<ActionStatus> => {
	const {user} = await getUserInfo();
	if (!user) return {status: 'error', message: 'Unauthenticated'};
	const user_id = user.id;

	let deletedCampaignName;

	try {
		const {campaign_id} = deleteCampaignSchema.parse(formData);
		const deletedCampaign = await db
			.delete(campaigns)
			.where(and(eq(campaigns.id, campaign_id), eq(campaigns.user_id, user_id)))
			.returning();
		deletedCampaignName = deletedCampaign[0].campaign_name;
	} catch (error) {
		return {
			status: 'error',
			message: 'An error occured while deleting campaign.',
		};
	}
	const deleted = encodeURIComponent(deletedCampaignName);
	revalidatePath('/');
	redirect(`/dashboard?message=${deleted}`);
};
