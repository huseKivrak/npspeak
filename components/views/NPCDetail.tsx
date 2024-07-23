'use client';

import { DialogueListTable } from '@/components/tables/DialogueListTable';
import { DialogueModal } from '../forms/modals/DialogueModal';
import { Divider } from '@nextui-org/divider';
import { Tabs, Tab } from '@nextui-org/tabs';
import { DetailedDialogue, DetailedNPC } from '@/types/drizzle';
import { formatDialoguesForSoundboard } from '@/utils/helpers/formatHelpers';
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
    <div className="flex flex-col w-full justify-center">
      <div className="flex flex-col">
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
          tabList: 'gap-3 w-full relative rounded-lg p-0',
          cursor: 'w-full',
          tab: 'max-w-full px-0 h-12',
          tabContent:
            'text-large font-semibold tracking-wider group-data-[selected=true]:',
        }}
      >
        <Tab
          key="table"
          title={
            <div className="flex items-center gap-2">
              <span>TABLE</span>
            </div>
          }
        >
          <DialogueListTable
            dialogues={dialogues || []}
            voiceId={npc.voice_id!}
            npcId={npc.id}
          />
        </Tab>
        <Tab
          key="soundboard"
          title={
            <div className="flex items-center">
              <span>SOUNDBOARD</span>
            </div>
          }
        >
          {dialogues ? (
            <Soundboard dialogues={formatDialoguesForSoundboard(dialogues)} />
          ) : (
            <p>No dialogues found</p>
          )}
        </Tab>
      </Tabs>
    </div>
  );
};
