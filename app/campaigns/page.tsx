import { getCampaignsWithNPCs } from '@/database/drizzle/queries';
import { CampaignListTable } from '@/components/tables/CampaignListTable';
import { CampaignWithNPCs } from '@/types/drizzle';

export default async function UserCampaignsPage() {
  const campaignResponse = await getCampaignsWithNPCs();
  const campaigns: CampaignWithNPCs[] =
    campaignResponse.status === 'success' ? campaignResponse.data : [];

  return (
    <div className="flex flex-col items-center">
      <CampaignListTable campaigns={campaigns} />
    </div>
  );
}
