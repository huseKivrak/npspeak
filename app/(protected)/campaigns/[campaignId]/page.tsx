import { getUserProfile } from '@/actions/auth';
import { notFound, redirect } from 'next/navigation';
import { getCampaignWithDetailedNPCs } from '@/database/drizzle/queries';
import { CampaignWithDetailedNPCs } from '@/types/types';
import { CampaignDetail } from '@/components/views/CampaignDetail';

export default async function CampaignDetailPage({
  params,
}: {
  params: {
    campaignId: number;
  };
}) {
  const { user } = await getUserProfile();
  if (!user) redirect('/login');

  const campaignId = params.campaignId;

  const response = await getCampaignWithDetailedNPCs(user.id, campaignId);
  if (response.status !== 'success') notFound();

  const campaign: CampaignWithDetailedNPCs = response.data;

  return (
    <div>
      <CampaignDetail campaign={campaign} />
    </div>
  );
}
