'use client';

import {useEffect} from 'react';
import {useForm, FieldPath} from 'react-hook-form';
import {useFormState} from 'react-dom';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {ttsHandlerSchema} from '@/database/drizzle/validation';
import {SubmitButton} from '@/components/buttons/SubmitButton';
import {ActionStatus} from '@/types/drizzle';
import {ErrorMessage} from '@hookform/error-message';
import ErrorToast from '@/components/ErrorToast';
import {FormOptions} from '@/types/drizzle';
import ttsHandler from '@/actions/ttsHandler';
import {RadioSelections} from './RadioSelections';
import {VoiceOptions} from './VoiceOptions';

type Inputs = z.infer<typeof ttsHandlerSchema>;
export default function TTSForm({
	dialogueOptions,
	npc_id,
}: {
	dialogueOptions: FormOptions;
	npc_id: number;
}) {
	const [state, formAction] = useFormState<ActionStatus, FormData>(ttsHandler, {
		status: 'idle',
		message: '',
	});

	const {
		register,
		formState: {errors},
		setError,
		reset,
		setValue,
	} = useForm<Inputs>({
		resolver: zodResolver(ttsHandlerSchema),
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
				<input type='hidden' name='npc_id' value={npc_id} />
				<RadioSelections
					fieldName='dialogue_id'
					options={dialogueOptions}
					register={register}
					setValue={setValue}
				/>
				<ErrorMessage
					errors={errors}
					name='dialogue_id'
					render={({message}) => <ErrorToast message={message} />}
				/>
				<VoiceOptions register={register} />
				<ErrorMessage
					errors={errors}
					name='voice_id'
					render={({message}) => <ErrorToast message={message} />}
				/>
				<SubmitButton text='create audio!' />
			</form>
		</div>
	);
}
