import { getAllCampaignsWithDetailedNPCs } from '@/database/drizzle/queries';
import { CampaignListTable } from '@/components/tables/CampaignListTable';
import { CampaignWithDetailedNPCs } from '@/types/types';
import { getUserProfile } from '@/actions/auth';
import { redirect } from 'next/navigation';

export default async function UserCampaignsPage() {
  const { user } = await getUserProfile();
  if (!user) redirect('/login');


  const campaignResponse = await getAllCampaignsWithDetailedNPCs(user.id);
  const campaigns: CampaignWithDetailedNPCs[] =
    campaignResponse.status === 'success' ? campaignResponse.data : [];

  return (
    <div className="flex flex-col ">
      <CampaignListTable campaigns={campaigns} />
    </div>
  );
}
