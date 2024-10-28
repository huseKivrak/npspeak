'use client';

import { CampaignWithDetailedNPCs } from '@/types/drizzle';
import { Divider } from '@nextui-org/react';
import { NPCListTable } from '../tables/NPCListTable';


export const CampaignDetail = ({
  campaign,
}: {
  campaign: CampaignWithDetailedNPCs;
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-2">

        <h1>{campaign.campaign_name}</h1>
        <span className="font-mono max-w-2xl">{campaign.description}</span>

        <Divider className='h-[.5px] bg-foreground my-2' />
        <h2>NPCs</h2>

        <NPCListTable npcs={campaign.npcs || []} />
      </div>
    </div>
  );
};
