'use client';
import {SubmitButton} from '../buttons/SubmitButton';
import {ElevenLabsVoice} from '@/types/elevenlabs';
import {addVoiceToNPC} from '@/actions/db/NPCs';
import {useFormState} from 'react-dom';
import {ActionStatus} from '@/types/drizzle';
import {getLabelOptions, filterByLabelValue} from '@/utils/elevenlabs/api';
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

	return (
		<form action={formAction}>
			<input type='hidden' name='npc_id' value={npc_id} />
			<select name='voice_id' id='voice_id'>
				{voiceOptions.map((voice) => {
					return (
						<option
							key={voice.voice_id}
							value={voice.voice_id}
							title={Object.values(voice.labels).join(', ')}
						>
							{voice.name}
						</option>
					);
				})}
			</select>
			<SubmitButton text='select voice' className='btn btn-accent' />
		</form>
	);
}
