'use client';

import {useEffect, useRef} from 'react';
import {useFormState} from 'react-dom';
import {SubmitButton} from '../buttons/SubmitButton';
import {cn} from '@/utils/helpers/clsxMerge';
import {ServerAction} from '@/types/drizzle';
import {DeleteModalMessages} from '@/lib/constants';

export function DeleteModal({
	id,
	idName,
	serverAction,
	className,
	children,
	...props
}: {
	id: number;
	idName: 'npc_id' | 'dialogue_id' | 'campaign_id';
	serverAction: ServerAction;
	className?: string;
	children?: React.ReactNode;
}) {
	const [state, formAction] = useFormState(serverAction, {
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

	const modalMessage = DeleteModalMessages[idName];
	const title =
		idName === 'npc_id'
			? 'NPC'
			: idName === 'dialogue_id'
			? 'Dialogue'
			: 'Campaign';
	const modalTitle = `Delete ${title}?`;
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
					<h3 className='font-bold text-lg'>{modalTitle}</h3>
					<p className='py-4'>{modalMessage}</p>
					<div className='modal-action'>
						<form method='dialog'>
							<button className='btn btn-sm'>Close</button>
						</form>
						<form action={formAction}>
							<input type='hidden' name={idName} value={id} />
							<SubmitButton className='btn btn-sm btn-error' text='Delete' />
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
}
