'use client';

import { useState } from 'react';
import { DialogueListTable } from '@/components/tables/DialogueListTable';
import { DialogueForm } from '../forms/DialogueForm';
import { Divider } from '@nextui-org/divider';
import { Button } from '@nextui-org/button';
import { Tabs, Tab } from '@nextui-org/tabs';
import { PlusIcon } from '../icons';
import { DetailedDialogue, DetailedNPC } from '@/types/drizzle';
import { formatDialoguesForSoundboard } from '@/utils/formatHelpers';
import { Soundboard } from '../soundboard/Soundboard';
import { Chip } from '@nextui-org/react';
import Link from 'next/link';

export const NPCDetail = ({
  npc,
  dialogues,
}: {
  npc: DetailedNPC;
  dialogues?: DetailedDialogue[];
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-2">
        <h1>{npc.npc_name}</h1>
        <p className="lg:text-xl">{npc.description}</p>
        <ul>
          {npc.campaigns.map((campaign) => (
            <Chip
              key={campaign.id}
              size="sm"
              variant="flat"
              className="hover:underline"
            >
              <Link
                key={campaign.id}
                href={`/campaigns/${campaign.id}`}
                className="text-tiny"
              >
                {campaign.campaign_name}
              </Link>
            </Chip>
          ))}
        </ul>
      </div>

      <Divider className="my-4" />

      <Tabs
        aria-label="Dialogue Views"
        size="lg"
        radius="sm"
        color="secondary"
        classNames={{
          tabList:
            'gap-3 w-full relative rounded-none p-0 border-b border-divider bg-transparent',
          cursor: 'w-full bg-danger',
          tab: 'max-w-full px-0 h-12',
          tabContent: 'text-3xl tracking-widest group-data-[selected=true]:',
        }}
      >
        <Tab key="table" title="TABLE">
          <DialogueListTable
            dialogues={dialogues || []}
            voiceId={npc.voice_id!}
          />
        </Tab>
        <Tab
          key="dialogue form"
          title={
            <div className="flex items-center space-x-2">
              <PlusIcon />
              <span>ADD DIALOGUE</span>
            </div>
          }
        >
          <DialogueForm npcId={npc.id} />
        </Tab>
      </Tabs>
    </div>
  );
};
