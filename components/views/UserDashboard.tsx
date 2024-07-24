'use client';
import { CampaignWithNPCs, DetailedNPC } from '@/types/drizzle';
import { CampaignListTable } from '../tables/CampaignListTable';
import { NPCListTable } from '../tables/NPCListTable';
import { Tabs, Tab, Chip, Button, Divider } from '@nextui-org/react';
import { PlusIcon } from '../icons';

import Link from 'next/link';
import { UserProfile } from '@/actions/auth';

export function UserDashboard({
  user,
  campaigns,
  npcs,
}: {
  user: UserProfile;
  campaigns: CampaignWithNPCs[] | null;
  npcs: DetailedNPC[] | null;
}) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col">
        <h1>dashboard</h1>
        <Divider className="my-2" />

        <div className="flex gap-3 tracking-wider">
          <Link href="/npcs/create">
            <Button size="sm" radius="sm" variant="flat">
              <PlusIcon />
              <span className="mb-1 ">NPC</span>
            </Button>
          </Link>
          <Link href="/campaigns/create">
            <Button size="sm" radius="sm" variant="flat">
              <PlusIcon />
              <span className="mb-1 ">campaign</span>
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
