import { CampaignWithNPCs } from '@/types/drizzle'

export function CampaignDetail({ campaign }: { campaign: CampaignWithNPCs }) {
  return (
    <div>
      <h1>{campaign.campaign_name}</h1>
      <p>{campaign.description}</p>
    </div>
  )
}
