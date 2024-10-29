'use client';

import { CampaignWithDetailedNPCs } from '@/types/types';
import { Button, Divider } from '@nextui-org/react';
import { NPCListTable } from '../tables/NPCListTable';
import Link from 'next/link';
import { IconPlus } from '@/lib/icons';


export const CampaignDetail = ({
  campaign,
}: {
  campaign: CampaignWithDetailedNPCs;
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-4">

        <h1>{campaign.campaign_name}</h1>
        <span className="max-w-prose font-mono sm:text-xl text-balance">{campaign.description}</span>

        <Divider className='h-[.5px] bg-foreground my-2' />

        <div className='flex space-x-8'>
          <h2>NPCs</h2>
          <Link href="/npcs/create" className='mt-2'>
            <Button variant="flat" color='success'>
              <IconPlus />
              <span>NPC</span>
            </Button>
          </Link>
        </div>
        <NPCListTable npcs={campaign.npcs || []} />
      </div>
    </div>
  );
};
