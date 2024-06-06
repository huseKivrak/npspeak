'use client'

import { useState } from 'react'
import { DialogueListTable } from '@/components/tables/DialogueListTable'
import { DialogueForm } from './forms/DialogueForm'
import { Divider } from '@nextui-org/divider'
import { Button } from '@nextui-org/button'
import { PlusIcon } from './icons'
import {
  DetailedDialogue,
  DetailedNPC,
  SoundboardDialogue,
} from '@/types/drizzle'
import { formatDialoguesForSoundboard } from '@/utils/formatHelpers'
import { Soundboard } from './soundboard/Soundboard'
export const NPCDetail = ({
  npc,
  dialogues,
}: {
  npc: DetailedNPC
  dialogues?: DetailedDialogue[]
}) => {
  const [showDialogueForm, setShowDialogueForm] = useState(false)

  const soundboardDialogues = dialogues
    ? formatDialoguesForSoundboard(dialogues)
    : []

  console.log('dialogues:', dialogues)
  console.log('soundboardDialogues:', soundboardDialogues)
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-2 w-5/6">
        <h1 className="text-4xl lg:text-6xl text-primary">{npc.npc_name}</h1>
        <Divider orientation="vertical" className="mx-4" />
        <p className="lg:text-xl max-w-md">{npc.description}</p>
      </div>
      <Divider className="my-4" />
      <Soundboard dialogues={soundboardDialogues} />
      <Divider className="my-4" />
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <h2 className="text-2xl">All Dialogue</h2>
          <Button
            variant="flat"
            size="sm"
            onClick={() => setShowDialogueForm(!showDialogueForm)}
            startContent={showDialogueForm ? '' : <PlusIcon />}
            className="w-fit "
          >
            {showDialogueForm ? 'cancel' : 'dialogue'}
          </Button>
        </div>
        {showDialogueForm && <DialogueForm npcId={npc.id} />}
        {dialogues && (
          <DialogueListTable dialogues={dialogues} voiceId={npc.voice_id!} />
        )}
      </div>
    </div>
  )
}
