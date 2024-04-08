'use client';

import {useState, useEffect} from 'react';
import {useForm, FieldPath, Controller} from 'react-hook-form';
import {useFormState} from 'react-dom';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {ttsHandlerSchema} from '@/database/drizzle/validation';
import {SubmitButton} from '@/components/buttons/SubmitButton';
import {ActionStatus, DetailedNPC} from '@/types/drizzle';
import {ErrorMessage} from '@hookform/error-message';
import {ErrorToast} from '@/components/ErrorToast';
import {FormOptions} from '@/types/drizzle';
import ttsHandler from '@/actions/ttsHandler';
import {VoiceSelect} from '../forms/dropdown/VoiceSelect';
import {ElevenLabsVoice} from '@/types/elevenlabs';
import {Radio, RadioGroup} from '@nextui-org/radio';

type Inputs = z.infer<typeof ttsHandlerSchema>;
export default function TTSForm({
	npc,
	voices,
	ttsDialogueOptions,
}: {
	npc: DetailedNPC;
	voices: ElevenLabsVoice[];
	ttsDialogueOptions: FormOptions;
}) {
	const [state, formAction] = useFormState<ActionStatus, FormData>(ttsHandler, {
		status: 'idle',
		message: '',
	});
	const [npcVoiceChosen, setNPCVoiceChosen] = useState(false);
	const [selectedVoiceURL, setSelectedVoiceURL] = useState('');

	const {
		register,
		control,
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

	const handleVoiceChange = (url: string) => {
		setSelectedVoiceURL(url);
	};

	return (
		<div className='flex flex-col '>
			<form className='flex flex-col gap-2 w-full max-w-sm'>
				<input type='hidden' name='npc_id' value={npc.id} />
				{ttsDialogueOptions.length > 0 ? (
					<>
						<h2 className=''>Select Dialogue:</h2>
						<Controller
							name='dialogue_id'
							control={control}
							render={({field}) => (
								<RadioGroup
									{...field}
									onChange={(value) => field.onChange(value)}
									value={field.value.toString()}
								>
									{ttsDialogueOptions.map((option) => (
										<Radio key={option.label} value={option.value.toString()}>
											{option.label}
										</Radio>
									))}
								</RadioGroup>
							)}
						/>

						<ErrorMessage
							errors={errors}
							name='dialogue_id'
							render={({message}) => <ErrorToast text={message} />}
						/>
						<h2 className=''>Select Voice:</h2>
						{npcVoiceChosen && (
							<span className='text-accent'>using {npc.npc_name}'s voice</span>
						)}
						{!npcVoiceChosen && (
							<>
								<VoiceSelect
									control={control}
									voiceOptions={voices}
									onVoiceChange={handleVoiceChange}
								/>
								<div className='flex items-center  mt-2'>
									<span className='text-primary font-semibold'>
										Voice Preview:
									</span>
									{selectedVoiceURL && (
										<audio src={selectedVoiceURL} controls />
									)}
								</div>
							</>
						)}
						<ErrorMessage
							errors={errors}
							name='voice_id'
							render={({message}) => <ErrorToast text={message} />}
						/>
						<SubmitButton
							formAction={formAction}
							pendingText='creating audio...'
							className='btn-accent mt-8'
						>
							create audio!
						</SubmitButton>
					</>
				) : (
					<ErrorToast text='TTS Unavailable!' className='text-center'>
						<p className='mt-4 text-accent'>
							Any dialogue for this NPC has audio.
						</p>
						<p className='text-accent'>Go create some more!</p>
					</ErrorToast>
				)}
			</form>
		</div>
	);
}
