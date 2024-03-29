'use client';
import {useEffect} from 'react';
import {useForm, FieldPath} from 'react-hook-form';
import {useFormState} from 'react-dom';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {createDialogueAction} from '@/actions/db/dialogue';
import {dialogueSchema} from '@/database/drizzle/validation';
import {SubmitButton} from '@/components/buttons/SubmitButton';
import {FormOptions, ActionStatus} from '@/types/drizzle';
import {ErrorMessage} from '@hookform/error-message';
import ErrorToast from '@/components/ErrorToast';
import {DefaultDialogueTypes} from '@/lib/constants';

type Inputs = z.infer<typeof dialogueSchema>;
export default function DialogueForm({npcId}: {npcId: number}) {
	const [state, formAction] = useFormState<ActionStatus, FormData>(
		createDialogueAction,
		{status: 'idle', message: ''}
	);

	const {
		register,
		formState: {errors},
		setError,
		reset,
	} = useForm<Inputs>({
		resolver: zodResolver(dialogueSchema),
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
			reset();
		}
	}, [state, setError, reset]);

	return (
		<div className='flex flex-col items-start mt-4'>
			<form action={formAction} className='flex flex-col gap-1 w-4/5 max-w-xs'>
				<input type='hidden' {...register('npc_id')} value={npcId} />

				<label
					htmlFor='dialogue_type_id'
					className='form-control text-primary font-semibold'
				>
					dialogue type
				</label>
				{DefaultDialogueTypes.map((option) => (
					<label key={option.value} className='label cursor-pointer'>
						<span className='label-text'>{option.label}</span>
						<input
							type='radio'
							value={option.value}
							{...register('dialogue_type_id')}
							className='checkbox'
							required
						/>
					</label>
				))}
				<ErrorMessage errors={errors} name='dialogue_type_id' />

				<label htmlFor='text' className='form-control'>
					Text
				</label>
				<textarea
					{...register('text')}
					id='text'
					className='textarea textarea-secondary textarea-sm w-full max-w-xs'
					rows={3}
					cols={20}
				/>
				<ErrorMessage errors={errors} name='text' />

				<SubmitButton text='add dialogue' />
			</form>
			{state?.status === 'error' && <ErrorToast text={state.message} />}
		</div>
	);
}
