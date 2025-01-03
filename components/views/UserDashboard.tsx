'use client';
import { CampaignWithDetailedNPCs, DetailedNPC } from '@/types/types';
import { CampaignListTable } from '../tables/CampaignListTable';
import { NPCListTable } from '../tables/NPCListTable';
import { Tabs, Tab, Chip, Button } from '@nextui-org/react';
import { IconPlus } from '../../lib/icons';

import Link from 'next/link';
import { UserProfile } from '@/actions/auth';

export function UserDashboard({
  user,
  campaigns,
  npcs,
}: {
  user: UserProfile;
  campaigns: CampaignWithDetailedNPCs[] | null;
  npcs: DetailedNPC[] | null;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4">
        <h1>dashboard</h1>

        <div className="flex space-x-4 mb-2 tracking-wider">
          <Link href="/npcs/create">
            <Button variant="flat">
              <IconPlus />
              <span>NPC</span>
            </Button>
          </Link>
          <Link href="/campaigns/create">
            <Button variant="flat">
              <IconPlus />
              <span>campaign</span>
            </Button>
          </Link>
        </div>
      </div>
      <Tabs
        aria-label="Options"
        size="lg"
        radius="sm"
        variant="solid"
        color="secondary"
        classNames={{
          tabList: 'w-full gap-3 relative rounded rounded-lg py-0',
          cursor: 'w-full',
          tab: 'px-0 h-12',
          tabContent:
            'sm:text-large font-semibold sm:tracking-wider group-data-[selected=true]:',
        }}
      >
        <Tab
          key="npcs"
          className="p-0 m-0"
          title={
            <div className="space-x-4">
              <span>NPC</span>
              <Chip variant="flat">{npcs?.length}</Chip>
            </div>
          }
        >
          {npcs && <NPCListTable npcs={npcs} />}
        </Tab>
        <Tab
          key="campaigns"
          className="p-0 m-0"
          title={
            <div className="space-x-4">
              <span>CAMPAIGN</span>
              <Chip variant="flat">{campaigns?.length}</Chip>
            </div>
          }
        >
          {campaigns && <CampaignListTable campaigns={campaigns} />}
        </Tab>
      </Tabs>
    </div>
  );
}
