'use client';

import {useFormState} from 'react-dom';
import {createNPCAction} from '@/server-actions/drizzle';
import {SubmitButton} from '../buttons/SubmitButton';
import ErrorToast from '../ErrorToast';

export default function NPCForm() {
	const [state, formAction] = useFormState(createNPCAction, null);

	const getFieldError = (fieldName: string) => {
		return state?.zodError?.find((err) => err.path[0] === fieldName)?.message;
	};

	return (
		<div className='flex flex-col items-center'>
			<form action={formAction} className='flex flex-col gap-2 w-full max-w-xs'>
				<label htmlFor='npc_name' className='form-control'>
					npc name (required)
				</label>
				<input
					type='text'
					name='npc_name'
					placeholder='what are they called?'
					className='input input-bordered input-primary mb-4'
					required
				/>
				{getFieldError('npc_name') && (
					<ErrorToast message={getFieldError('npc_name')} />
				)}
				<label htmlFor='description' className='form-control'>
					description
				</label>
				<input
					type='textarea'
					name='description'
					placeholder='describe your NPC'
					className='textarea textarea-primary w-full h-24'
				/>
				{getFieldError('description') && (
					<ErrorToast message={getFieldError('description')} />
				)}
				<SubmitButton text='create' />
				{state?.zodError && <ErrorToast message={state.message} />}
			</form>
		</div>
	);
}
