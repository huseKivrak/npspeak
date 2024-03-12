'use client';
import {ElevenLabsVoice} from '@/types/elevenlabs';
import {useEffect, useState} from 'react';
import {UseFormRegister} from 'react-hook-form';

export function VoiceOptions({register}: {register: UseFormRegister<any>}) {
	const [voices, setVoices] = useState<ElevenLabsVoice[]>([]);

	useEffect(() => {
		async function fetchVoices() {
			try {
				const response = await fetch('/api/elevenlabs');
				const data = await response.json();

				setVoices(data.voices);
			} catch (error) {
				console.error('error getting elevenlabs voices:', error);
			}
		}
		fetchVoices();
	}, []);

	if (voices.length === 0) {
		return <option value=''>loading voices...</option>;
	}

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
