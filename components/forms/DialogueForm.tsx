'use client';
import {useEffect} from 'react';
import {useForm, FieldPath} from 'react-hook-form';
import {useFormState} from 'react-dom';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {createDialogueAction} from '@/actions/drizzle/dialogue';
import {dialogueSchema} from '@/database/drizzle/validation';
import {SubmitButton} from '@/components/buttons/SubmitButton';
import {FormOptions, State} from '@/types/drizzle';
import {ErrorMessage} from '@hookform/error-message';
import ErrorToast from '@/components/ErrorToast';

type Inputs = z.infer<typeof dialogueSchema>;
export default function DialogueForm({
	dialogueTypes,
	npcId,
}: {
	dialogueTypes: FormOptions;
	npcId: number;
}) {
	const [state, formAction] = useFormState<State, FormData>(
		createDialogueAction,
		null
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
			alert(state.message);
			reset();
		}
	}, [state, setError, reset]);

	return (
		<div className='flex flex-col items-center'>
			<form action={formAction} className='flex flex-col gap-2 w-full max-w-xs'>
				<input type='hidden' {...register('npc_id')} value={npcId} />

				<label htmlFor='dialogue_type_id' className='form-control'>
					Type of Dialogue
				</label>
				{dialogueTypes?.map((option) => (
					<label key={option.value} className='label cursor-pointer'>
						<span className='label-text'>{option.label}</span>
						<input
							type='radio'
							value={option.value}
							{...register('dialogue_type_id')}
							className='checkbox'
						/>
					</label>
				))}
				<ErrorMessage errors={errors} name='dialogue_type_id' />

				<label htmlFor='text' className='form-control'>
					Text
				</label>
				<input
					{...register('text')}
					type='text'
					id='text'
					className='input-field'
				/>
				<ErrorMessage errors={errors} name='text' />

				<SubmitButton text='add dialogue' />
			</form>
			{state?.status === 'error' && <ErrorToast message={state.message} />}
		</div>
	);
}
