import {getUserInfo} from '@/actions/auth';
import {redirect} from 'next/navigation';
import OpenScrollCard from '@/components/cards/OpenScrollCard';
import {getCampaignsWithNPCs} from '@/database/drizzle/queries';
import ErrorToast from '@/components/ErrorToast';

export default async function CampaignDetailPage({
	params,
}: {
	params: {
		username: string;
		campaignId: number;
	};
}) {
	const {user} = await getUserInfo();
	if (!user) return redirect('/login');

	const campaignId = params.campaignId;
	const userCampaigns = await getCampaignsWithNPCs();
	if (!userCampaigns) return <ErrorToast message='No campaigns found' />;
	const campaign = userCampaigns.find((c) => c.id === campaignId);
	if (!campaign) return <ErrorToast message='Campaign not found' />;

	return (
		<div>
			<OpenScrollCard campaign={campaign} />
		</div>
	);
}
