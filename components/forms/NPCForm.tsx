'use client';

import {useEffect} from 'react';
import {useForm, FieldPath} from 'react-hook-form';
import {useFormState} from 'react-dom';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {createNPCAction} from '@/actions/drizzle/NPCs';
import {npcSchema} from '@/database/drizzle/validation';
import {SubmitButton} from '@/components/buttons/SubmitButton';
import {State} from '@/types/drizzle';
import {ErrorMessage} from '@hookform/error-message';
import ErrorToast from '@/components/ErrorToast';

type Inputs = z.infer<typeof npcSchema>;
export default function NPCForm() {
	const [state, formAction] = useFormState<State, FormData>(
		createNPCAction,
		null
	);

	const {
		register,
		formState: {errors},
		setError,
		reset,
	} = useForm<Inputs>({
		resolver: zodResolver(npcSchema),
	});

	useEffect(() => {
		if (!state) return;
		if (state?.status === 'error') {
			console.log('errors:', state.errors);
			state.errors?.forEach((error) => {
				setError(error.path as FieldPath<Inputs>, {
					message: error.message,
				});
			});
		}
		if (state.status === 'success') {
			alert(state.message);
			reset();
		}
	}, [state, setError, reset]);

	return (
		<div className='flex flex-col items-center'>
			<form action={formAction} className='flex flex-col gap-2 w-full max-w-xs'>
				<label htmlFor='npc_name' className='form-control'>
					npc name
				</label>
				<input
					{...register('npc_name')}
					id='npc_name'
					type='text'
					name='npc_name'
					placeholder='what are they called?'
					className='input input-bordered input-primary mb-4'
				/>
				<ErrorMessage
					errors={errors}
					name='npc_name'
					as={<ErrorToast message='NPC name is required' />}
				/>
				<label htmlFor='description' className='form-control'>
					description
				</label>
				<textarea
					{...register('description')}
					id='description'
					name='description'
					placeholder='describe your NPC'
					className='textarea textarea-primary w-full h-24'
				/>
				<ErrorMessage
					errors={errors}
					name='description'
					as={<ErrorToast message='Description is required' />}
				/>
				<SubmitButton text='create' />
			</form>
		</div>
	);
}
