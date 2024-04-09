'use client';
import {useState} from 'react';
import DialogueForm from './forms/DialogueForm';
import {cn} from '@/utils/helpers/clsxMerge';
import {Button} from '@nextui-org/react';

export default function AddDialogueToNPC({npcId}: {npcId: number}) {
	const [showDialogueForm, setShowDialogueForm] = useState(false);
	return (
		<div className='flex flex-col'>
			<Button
				className={cn('btn btn-outline btn-sm max-w-fit mt-4', {
					'btn-primary': !showDialogueForm,
					'btn-error': showDialogueForm,
				})}
				onClick={() => setShowDialogueForm(!showDialogueForm)}
			>
				{showDialogueForm ? 'cancel' : '+ add dialogue'}
			</Button>
			{showDialogueForm && <DialogueForm npcId={npcId} />}
		</div>
	);
}
