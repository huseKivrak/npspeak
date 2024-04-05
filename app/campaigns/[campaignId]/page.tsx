import {getUserInfo} from '@/actions/auth';
import {redirect} from 'next/navigation';
import OpenScrollCard from '@/components/_oldComponents/_OpenScrollCard';
import {getCampaignsWithNPCs} from '@/database/drizzle/queries';
import {ErrorToast} from '@/components/ErrorToast';

export default async function CampaignDetailPage({
	params,
}: {
	params: {
		campaignId: number;
	};
}) {
	const {user} = await getUserInfo();
	if (!user) return redirect('/login');

	const campaignId = params.campaignId;
	const userCampaigns = await getCampaignsWithNPCs();
	if (!userCampaigns) return <ErrorToast text='No campaigns found' />;
	const campaign = userCampaigns.find((c) => c.id === campaignId);
	if (!campaign) return <ErrorToast text='Campaign not found' />;

	return (
		<div>
			<OpenScrollCard campaign={campaign} />
		</div>
	);
}
