import CampaignForm from '@/components/forms/CampaignForm';
import {getUserFromSession} from '@/actions/auth';
import {redirect} from 'next/navigation';
import {getNPCsWithCampaigns} from '@/database/drizzle/queries';
import {transformNPCOptions} from '@/utils/helpers/formHelpers';

export default async function CreateCampaignPage() {
	const user = getUserFromSession();
	if (!user) {
		redirect('/login');
	}
	const npcs = await getNPCsWithCampaigns();
	const npcOptions = npcs ? transformNPCOptions(npcs) : [];

	return (
		<div className='flex flex-col items-center'>
			<h1 className='mb-4 font-bold tracking-widest underline'>
				create a new campaign
			</h1>
			<CampaignForm npcOptions={npcOptions} />
		</div>
	);
}
