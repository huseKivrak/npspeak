import {getUserInfo} from '@/actions/auth';
import {redirect} from 'next/navigation';
import OpenScrollCard from '@/components/_oldComponents/_OpenScrollCard';
import {getCampaignsWithNPCs} from '@/database/drizzle/queries';
import {ErrorToast} from '@/components/ErrorToast';
import {CampaignWithNPCs} from '@/types/drizzle';

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
	const campaignResponse = await getCampaignsWithNPCs(campaignId);
	const campaign: CampaignWithNPCs =
		campaignResponse.status === 'success' ? campaignResponse.data : null;

	return <div></div>;
}
