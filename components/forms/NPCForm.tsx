'use client';

import {useState, useEffect} from 'react';
import {useForm, FieldPath, Controller} from 'react-hook-form';
import {useFormState} from 'react-dom';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {createNPCAction} from '@/actions/db/NPCs';
import {npcSchema} from '@/database/drizzle/validation';
import {SubmitButton} from '@/components/buttons/SubmitButton';
import {ActionStatus} from '@/types/drizzle';
import {ErrorMessage} from '@hookform/error-message';
import {ErrorToast} from '@/components/ErrorToast';
import {FormOptions} from '@/types/drizzle';
import {
	CheckboxGroup,
	Checkbox,
	Textarea,
	Button,
	Input,
} from '@nextui-org/react';
import {VoiceSelect} from './dropdown/VoiceSelect';
import {ElevenLabsVoice} from '@/types/elevenlabs';
import {PlusIcon} from '../icons';

interface NPCFormProps {
	campaignOptions?: FormOptions;
	voiceOptions: ElevenLabsVoice[];
}

type Inputs = z.infer<typeof npcSchema>;
export const NPCForm = ({campaignOptions, voiceOptions}: NPCFormProps) => {
	const [state, formAction] = useFormState<ActionStatus, FormData>(
		createNPCAction,
		{status: 'idle', message: ''}
	);
	const [showAddCampaign, setShowAddCampaign] = useState(false);
	const [selectedVoiceURL, setSelectedVoiceURL] = useState<string | null>(null);
	const [autoplay, setAutoplay] = useState(false);
	const {
		register,
		control,
		formState: {errors},
		setError,
	} = useForm<Inputs>({
		mode: 'all',
		criteriaMode: 'all',
		resolver: zodResolver(npcSchema),
	});

	const handleVoiceChange = (voiceURL: string) => {
		setSelectedVoiceURL(voiceURL);
	};

	useEffect(() => {
		if (state.status === 'idle') return;
		if (state.status === 'error') {
			console.log('errors:', state.errors);
			state.errors?.forEach((error) => {
				setError(error.path as FieldPath<Inputs>, {
					message: error.message,
				});
			});
		}
	}, [state, setError]);

	const hasCampaigns = campaignOptions && campaignOptions.length > 0;

	return (
		<div className='flex flex-col items-start mb-8'>
			<form className='flex flex-col gap-2 w-full max-w-xs'>
				<Input
					{...register('npc_name')}
					id='npc_name'
					type='text'
					name='npc_name'
					placeholder='what are they called?'
					variant='bordered'
				/>
				<ErrorMessage
					errors={errors}
					name='npc_name'
					render={({message}) => <ErrorToast text={message} />}
				/>
				<Textarea
					{...register('description')}
					id='description'
					name='description'
					placeholder='describe your NPC'
					variant='bordered'
				/>
				<ErrorMessage
					errors={errors}
					name='description'
					render={({message}) => <ErrorToast text={message} />}
				/>
				<VoiceSelect
					control={control}
					voiceOptions={voiceOptions}
					onVoiceChange={handleVoiceChange}
				/>
				<div className='flex items-center my-4 gap-6'>
					<span className='text-secondary-600 font-semibold'>
						Voice Preview:
					</span>
					<audio src={selectedVoiceURL ?? ''} controls autoPlay={autoplay} />
					<Checkbox
						isSelected={autoplay}
						onValueChange={setAutoplay}
						color='success'
						radius='full'
						size='lg'
					>
						Autoplay
					</Checkbox>
				</div>
				{hasCampaigns && (
					<Button
						onClick={() => setShowAddCampaign(!showAddCampaign)}
						variant='flat'
						color='primary'
						startContent={showAddCampaign ? '' : <PlusIcon />}
					>
						{showAddCampaign ? 'cancel' : 'campaign(s)'}
					</Button>
				)}
				{showAddCampaign && hasCampaigns && (
					<Controller
						name='campaign_ids'
						control={control}
						render={({field: {ref}}) => (
							<CheckboxGroup
								label='campaigns'
								name='campaign_ids'
								orientation='horizontal'
								ref={ref}
							>
								{campaignOptions.map((option) => (
									<Checkbox key={option.label} value={option.value.toString()}>
										{option.label}
									</Checkbox>
								))}
							</CheckboxGroup>
						)}
					/>
				)}
				<SubmitButton
					formAction={formAction}
					pendingText='creating NPC...'
					variant='flat'
					color='success'
					className='mt-2 font-bold text-large'
				>
					create NPC!
				</SubmitButton>
			</form>
		</div>
	);
};
