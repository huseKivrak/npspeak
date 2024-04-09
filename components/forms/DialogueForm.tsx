'use client';
import {useEffect} from 'react';
import {useForm, Controller, FieldPath} from 'react-hook-form';
import {useFormState} from 'react-dom';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {createDialogueAction} from '@/actions/db/dialogue';
import {dialogueSchema} from '@/database/drizzle/validation';
import {SubmitButton} from '@/components/buttons/SubmitButton';
import {ActionStatus} from '@/types/drizzle';
import {ErrorMessage} from '@hookform/error-message';
import {ErrorToast} from '@/components/ErrorToast';
import {DefaultDialogueTypes} from '@/lib/constants';
import {RadioGroup, Radio, Textarea} from '@nextui-org/react';
type Inputs = z.infer<typeof dialogueSchema>;
export default function DialogueForm({npcId}: {npcId: number}) {
	const [state, formAction] = useFormState<ActionStatus, FormData>(
		createDialogueAction,
		{status: 'idle', message: ''}
	);

	const {
		register,
		control,
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
			<form className='flex flex-col gap-1 w-4/5 max-w-xs'>
				<input type='hidden' {...register('npc_id')} value={npcId} />
				<Controller
					name='dialogue_type_id'
					control={control}
					defaultValue={DefaultDialogueTypes[0].value}
					render={({field: {ref}}) => (
						<RadioGroup
							label='type'
							orientation='horizontal'
							name='dialogue_type_id'
							isRequired
							ref={ref}
						>
							{DefaultDialogueTypes.map((option) => (
								<Radio key={option.label} value={option.value.toString()}>
									{option.label}
								</Radio>
							))}
						</RadioGroup>
					)}
				/>
				<ErrorMessage errors={errors} name='dialogue_type_id' />

				<Controller
					name='text'
					control={control}
					render={({field}) => (
						<Textarea
							{...field}
							label='text'
							className='max-w-xs mt-4'
							variant='bordered'
							labelPlacement='outside'
							isRequired
						/>
					)}
				/>
				<ErrorMessage errors={errors} name='text' />

				<SubmitButton formAction={formAction} pendingText='adding dialogue...'>
					add dialogue
				</SubmitButton>
			</form>
			{state?.status === 'error' && <ErrorToast text={state.message} />}
		</div>
	);
}
