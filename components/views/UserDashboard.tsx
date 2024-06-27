'use client';
import { CampaignWithNPCs, DetailedNPC } from '@/types/drizzle';
import { CampaignListTable } from '../tables/CampaignListTable';
import { NPCListTable } from '../tables/NPCListTable';
import { Tabs, Tab, Chip, Button, Divider } from '@nextui-org/react';
import { PlusIcon } from '../icons';
import { BasicUserInfo } from '@/types/supabase';
import Link from 'next/link';

export function UserDashboard({
  user,
  campaigns,
  npcs,
}: {
  user: BasicUserInfo;
  campaigns: CampaignWithNPCs[] | null;
  npcs: DetailedNPC[] | null;
}) {
  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex flex-col">
        <h1>{user.username} Dashboard</h1>
        <Divider className="my-2" />
        <div className="flex flex-col items-start">
          <div className="flex flex-row gap-3 tracking-wider">
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
      </div>
      <Tabs
        aria-label="Options"
        size="lg"
        radius="sm"
        variant="solid"
        classNames={{
          tabList:
            'gap-3 w-full relative rounded-none p-0 border-b border-divider bg-transparent',
          cursor: 'w-full bg-danger',
          tab: 'max-w-full px-0 h-12',
          tabContent: 'text-3xl tracking-widest group-data-[selected=true]:',
        }}
      >
        <Tab
          key="npcs"
          title={
            <div className="flex items-center space-x-2">
              <span>NPC</span>
              <Chip size="lg" variant="flat">
                {npcs?.length}
              </Chip>
            </div>
          }
        >
          {npcs && <NPCListTable npcs={npcs} />}
        </Tab>
        <Tab
          key="campaigns"
          title={
            <div className="flex items-center space-x-2">
              <span>CAMPAIGN</span>
              <Chip size="lg" variant="flat">
                {campaigns?.length}
              </Chip>
            </div>
          }
        >
          {campaigns && <CampaignListTable campaigns={campaigns} />}
        </Tab>
      </Tabs>
    </div>
  );
}
