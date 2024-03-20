import {useForm, Controller} from 'react-hook-form';
import Select from 'react-select';
import {VoiceOption} from '../VoiceOption';
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
	const {control} = useForm<Inputs>();

	return (
		<form action={formAction}>
			<input type='hidden' name='npc_id' value={npc_id} />
			<VoiceSelect control={control} voiceOptions={voiceOptions} />
			<SubmitButton text='select voice' className='btn btn-accent' />
		</form>
	);
}
