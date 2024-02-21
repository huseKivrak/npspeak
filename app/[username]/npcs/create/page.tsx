import NPCForm from '@/components/forms/NPCForm';
import {getUserFromSession} from '@/actions/auth';
import {redirect} from 'next/navigation';
import {getCampaignsWithNPCs} from '@/database/drizzle/queries';
import {transformCampaignOptions} from '@/utils/helpers/formHelpers';

export default async function CreateCampaignPage() {
	const user = getUserFromSession();
	if (!user) {
		redirect('/login');
	}
	const campaigns = await getCampaignsWithNPCs();
	const campaignOptions = campaigns ? transformCampaignOptions(campaigns) : [];

	return (
		<div className='flex flex-col items-center'>
			<h1 className='mb-4 font-bold tracking-widest underline'>
				create a new campaign
			</h1>
			<NPCForm campaignOptions={campaignOptions} />
		</div>
	);
}
