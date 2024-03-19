'use client';
import {ElevenLabsVoice} from '@/types/elevenlabs';
import {UseFormRegister} from 'react-hook-form';

export function VoiceOptions({
	voices,
	register,
}: {
	voices: ElevenLabsVoice[];
	register: UseFormRegister<any>;
}) {
	return (
		<div className='form-control'>
			<select
				{...register('voice_id', {required: true})}
				className='select select-secondary w-full max-w-xs'
				required
			>
				<option value=''>select a voice</option>
				{voices &&
					voices.map((voice) => (
						<option
							key={voice.voice_id}
							value={voice.voice_id}
							title={Object.values(voice.labels).join(', ')}
						>
							{voice.name}
						</option>
					))}
			</select>
		</div>
	);
}
