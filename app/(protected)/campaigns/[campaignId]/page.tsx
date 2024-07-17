import { getUserProfile } from '@/actions/auth';
import { redirect } from 'next/navigation';
import { getCampaignsWithNPCs } from '@/database/drizzle/queries';
import { CampaignWithNPCs } from '@/types/drizzle';
import { CampaignDetail } from '@/components/views/CampaignDetail';

export default async function CampaignDetailPage({
  params,
}: {
  params: {
    campaignId: number;
  };
}) {
  const { user } = await getUserProfile();
  if (!user) return redirect('/login');

  const campaignId = params.campaignId;
  const campaignResponse = await getCampaignsWithNPCs(campaignId);
  const campaign: CampaignWithNPCs =
    campaignResponse.status === 'success' ? campaignResponse.data : null;

  if (campaign.user_id !== user.id) return <div>Unauthorized</div>;

  return (
    <div>
      <CampaignDetail campaign={campaign} />
    </div>
  );
}
