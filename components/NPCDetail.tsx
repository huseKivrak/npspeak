'use client'

import { useState } from 'react'
import { DialogueListTable } from '@/components/tables/DialogueListTable'
import { DialogueForm } from './forms/DialogueForm'
import { Divider } from '@nextui-org/divider'
import { Button } from '@nextui-org/button'
import { Tabs, Tab } from '@nextui-org/tabs'
import { PlusIcon } from './icons'
import { DetailedDialogue, DetailedNPC } from '@/types/drizzle'
import { formatDialoguesForSoundboard } from '@/utils/formatHelpers'
import { Soundboard } from './soundboard/Soundboard'
export const NPCDetail = ({
  npc,
  dialogues,
}: {
  npc: DetailedNPC
  dialogues?: DetailedDialogue[]
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-4xl lg:text-6xl text-primary">{npc.npc_name}</h1>
        <p className="lg:text-xl">{npc.description}</p>
      </div>

      <Divider className="my-4" />

      <Tabs
        isVertical
        aria-label="Dialogue Views"
        size="lg"
        radius="sm"
        color="secondary"
      >
        <Tab key="table" title="Table">
          {dialogues ? (
            <DialogueListTable dialogues={dialogues} voiceId={npc.voice_id!} />
          ) : (
            ''
          )}
        </Tab>
        <Tab key="soundboard" title="Soundboard">
          {dialogues ? (
            <Soundboard dialogues={formatDialoguesForSoundboard(dialogues)} />
          ) : (
            ''
          )}
        </Tab>
        <Tab
          key="dialogue form"
          title={
            <div className="flex items-center space-x-2">
              <PlusIcon />
              <span>dialogue</span>
            </div>
          }
        >
          <DialogueForm npcId={npc.id} />
        </Tab>
      </Tabs>
    </div>
  )
}
