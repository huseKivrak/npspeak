'use client';
import { CampaignWithNPCs, DetailedNPC } from '@/types/drizzle';
import { CampaignListTable } from '../tables/CampaignListTable';
import { NPCListTable } from '../tables/NPCListTable';
import { Tabs, Tab, Chip, Button } from '@nextui-org/react';
import { useState } from 'react';
import { NPCForm } from '../forms/NPCForm';
import CampaignForm from '../forms/CampaignForm';
import { ElevenLabsVoice } from '@/types/elevenlabs';
import { PlusIcon } from '../icons';
import {
  transformNPCOptions,
  transformCampaignOptions,
} from '@/utils/helpers/formHelpers';
export function UserDashboard({
  campaigns,
  npcs,
  voices,
}: {
  campaigns: CampaignWithNPCs[] | null;
  npcs: DetailedNPC[] | null;
  voices: ElevenLabsVoice[];
}) {
  const npcOptions = transformNPCOptions(npcs ?? []);
  const campaignOptions = transformCampaignOptions(campaigns ?? []);
  return (
    <div className="flex flex-col w-full">
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
