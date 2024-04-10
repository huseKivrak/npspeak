'use client';

import {useState} from 'react';
import {DialogueListTable} from '@/components/tables/DialogueListTable';
import {DialogueForm} from './forms/DialogueForm';
import {Divider} from '@nextui-org/divider';
import {Button} from '@nextui-org/button';
import {PlusIcon} from './icons';
import {DetailedDialogue, DetailedNPC} from '@/types/drizzle';
export const NPCDetail = ({
	npc,
	dialogues,
}: {
	npc: DetailedNPC;
	dialogues?: DetailedDialogue[];
}) => {
	const [showDialogueForm, setShowDialogueForm] = useState(false);

	return (
		<div className='flex flex-col w-full'>
			<div className='flex gap-2 w-5/6'>
				<h1 className='text-4xl lg:text-6xl text-primary'>{npc.npc_name}</h1>
				<Divider orientation='vertical' className='mx-4' />
				<p className='lg:text-xl'>{npc.description}</p>
			</div>
			<Divider className='my-4' />
			<div className='flex flex-col gap-4'>
				<div className='flex gap-4'>
					<h2 className='text-xl'>{`${npc.npc_name}'s Dialogue`}</h2>
					<Button
						variant='flat'
						color='success'
						size='sm'
						onClick={() => setShowDialogueForm(!showDialogueForm)}
						startContent={showDialogueForm ? '' : <PlusIcon />}
						className='w-fit'
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
	);
};
