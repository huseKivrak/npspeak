import { CampaignWithNPCs } from '@/types/drizzle';

export const CampaignDetail = ({
  campaign,
}: {
  campaign: CampaignWithNPCs;
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-2">
        <h1>{campaign.campaign_name}</h1>

        <p>{campaign.description}</p>
      </div>
    </div>
  );
};
