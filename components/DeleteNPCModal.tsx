'use client';

import {useEffect, useRef} from 'react';
import {useFormState} from 'react-dom';
import {deleteNPCAction} from '@/actions/drizzle/NPCs';
import {SubmitButton} from './buttons/SubmitButton';
import {PiSkullBold} from 'react-icons/pi';
import {cn} from '@/utils/helpers/clsxMerge';

export default function DeleteNPCModal({
	id,
	className,
	children,
	...props
}: {
	id: number;
	className?: string;
	children?: React.ReactNode;
}) {
	const [state, formAction] = useFormState(deleteNPCAction, null);
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
					<h3 className='font-bold text-lg'>Delete NPC</h3>
					<p className='py-4'>
						Are you sure you want to delete this NPC and all of its dialogue?
						This action cannot be undone.
					</p>
					<div className='modal-action'>
						<form method='dialog'>
							<button className='btn btn-sm'>Close</button>
						</form>
						<form action={formAction}>
							<input type='hidden' name='npc_id' value={id} />
							<SubmitButton className='btn btn-sm btn-error' text='Delete' />
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
}
