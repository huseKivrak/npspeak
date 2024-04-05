'use client';

import {useEffect, useRef} from 'react';
import {useFormState} from 'react-dom';
import {SubmitButton} from '../buttons/SubmitButton';
import {cn} from '@/utils/helpers/clsxMerge';
import ttsHandler from '@/actions/ttsHandler';
import {Tables} from '@/types/supabase';
import {DetailedDialogue} from '@/types/drizzle';

export default function AddTTSModal({
	dialogue,
	voiceId,
	npcId,
	className,
	children,
	...props
}: {
	dialogue: Tables<'npc_dialogues'> | DetailedDialogue;
	voiceId: string;
	npcId: number;
	className?: string;
	children?: React.ReactNode;
}) {
	const [state, formAction] = useFormState(ttsHandler, {
		status: 'idle',
		message: '',
	});
	const dialogRef = useRef<HTMLDialogElement>(null);

	const openModal = () => {
		if (dialogRef.current) {
			dialogRef.current.showModal();
		}
	};

	useEffect(() => {
		if (!state) return;
		if (state?.status === 'error') {
			console.log('STATE ERRORS:', state.errors);
		}
		if (state.status === 'success') {
			dialogRef.current?.close();
		}
	}, [state]);

	return (
		<>
			<button
				onClick={openModal}
				className={cn('btn btn-sm btn-danger', className)}
				{...props}
			>
				{children}
			</button>
			<dialog ref={dialogRef} className='modal modal-bottom sm:modal-middle'>
				<div className='modal-box'>
					<h3 className='font-bold text-lg'>Create Audio</h3>
					<p className='py-4'>Create audio for this dialogue?</p>
					<div className='modal-action'>
						<form method='dialog'>
							<button className='btn btn-sm'>Close</button>
						</form>
						<form action={formAction}>
							<input type='hidden' name='dialogue_id' value={dialogue.id} />
							<input type='hidden' name='text' value={dialogue.text} />
							<input type='hidden' name='npc_id' value={npcId} />
							<input type='hidden' name='voice_id' value={voiceId} />
							<SubmitButton className='btn btn-sm btn-success' text='Create' />
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
}
