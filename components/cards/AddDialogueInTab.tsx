'use client';
import {useState} from 'react';
import DialogueForm from '../forms/DialogueForm';
import {cn} from '@/utils/helpers/clsxMerge';

export default function AddDialogueInTab({npcId}: {npcId: number}) {
	const [showDialogueForm, setShowDialogueForm] = useState(false);
	return (
		<>
			<button
				className={cn('btn btn-outline btn-sm max-w-fit mt-4', {
					'btn-primary': !showDialogueForm,
					'btn-error': showDialogueForm,
				})}
				onClick={() => setShowDialogueForm(!showDialogueForm)}
			>
				{showDialogueForm ? 'cancel' : 'add'}
			</button>
			{showDialogueForm && <DialogueForm npcId={npcId} />}
		</>
	);
}
