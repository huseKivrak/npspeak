'use client';

import {useRef, useEffect} from 'react';
import {useFormState} from 'react-dom';
import {deleteCampaignAction} from '@/actions/drizzle/campaigns';
import {SubmitButton} from './buttons/SubmitButton';

export default function DeleteCampaignModal({id}: {id: number}) {
	const [state, formAction] = useFormState(deleteCampaignAction, null);
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
			<button className='btn' onClick={openModal}>
				Delete
			</button>
			<dialog ref={dialogRef} className='modal modal-bottom sm:modal-middle'>
				<div className='modal-box'>
					<h3 className='font-bold text-lg'>Delete Campaign</h3>

					<p className='py-4'>
						Are you sure you want to delete this campaign? This action cannot be
						undone.
					</p>
					<div className='modal-action'>
						<form method='dialog'>
							<button className='btn'>Close</button>
						</form>
						<form action={formAction}>
							<input type='hidden' name='campaign_id' value={id} />
							<SubmitButton className='btn' text='Delete' />
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
}
