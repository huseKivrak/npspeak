import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {addVoiceToNPC} from '@/actions/db/NPCs';
import {SubmitButton} from '../buttons/SubmitButton';
import {useFormState} from 'react-dom';
import {ActionStatus} from '@/types/drizzle';
import {ElevenLabsVoice} from '@/types/elevenlabs';
import {getLabelOptions, filterByLabelValue} from '@/utils/elevenlabs/api';
import {VoiceSelect} from '../VoiceSelect';

interface Inputs {
	npc_id: number;
	voice_id: string;
}

export default function AddVoiceToNPCForm({
	voiceOptions,
	npc_id,
}: {
	voiceOptions: ElevenLabsVoice[];
	npc_id: number;
}) {
	const [state, formAction] = useFormState<ActionStatus, FormData>(
		addVoiceToNPC,
		{status: 'idle', message: ''}
	);
	const [selectedVoiceURL, setSelectedVoiceURL] = useState<string | null>(null);
	const {control} = useForm<Inputs>();

	const handleVoiceChange = (url: string) => {
		setSelectedVoiceURL(url);
	};

	return (
		<form action={formAction}>
			<input type='hidden' name='npc_id' value={npc_id} />
			<VoiceSelect
				control={control}
				voiceOptions={voiceOptions}
				onVoiceChange={handleVoiceChange}
			/>
			<div className='flex items-center mt-2'>
				<span className='text-primary font-semibold'>Voice Preview:</span>
				{selectedVoiceURL && <audio src={selectedVoiceURL} controls />}
			</div>
			<SubmitButton text='select voice' className=' btn-accent btn-sm mt-8' />
		</form>
	);
}
