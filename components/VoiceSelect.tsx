import Select from 'react-select';
import {Controller, Control} from 'react-hook-form';
import {ElevenLabsVoice} from '@/types/elevenlabs';
import {VoiceOption} from './VoiceOption';

interface VoiceSelectProps {
	control: Control<any>;
	voiceOptions: ElevenLabsVoice[];
}

export const VoiceSelect = ({control, voiceOptions}: VoiceSelectProps) => {
	const alphabetizedVoices = voiceOptions.sort((a, b) =>
		a.name.localeCompare(b.name)
	);
	return (
		<Controller
			name='voice_id'
			control={control}
			render={({field}) => (
				<Select
					{...field}
					options={alphabetizedVoices.map((voice: ElevenLabsVoice) => ({
						value: voice.voice_id,
						label: voice.name,
						gender: voice.labels.gender,
						accent: voice.labels.accent,
						description: voice.labels.description,
						useCase: voice.labels.use_case || voice.labels['use case'],
					}))}
					components={{Option: VoiceOption}}
				/>
			)}
		/>
	);
};
