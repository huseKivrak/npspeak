'use client';
import {SubmitButton} from '@/components/buttons/SubmitButton';
import {useFormState} from 'react-dom';
import {createElevenLabsTTSAction} from '@/actions/elevenLabs';
import {useState, useEffect} from 'react';
import {ElevenLabsVoice} from '@/types/elevenlabs';

/**
 * tts form page
 *
 */
export default function TextToSpeechPage() {
	const [state, formAction] = useFormState(createElevenLabsTTSAction, {
		status: 'idle',
		message: '',
	});
	const [voices, setVoices] = useState<ElevenLabsVoice[] | null>(null); //*
	const [audioFilePath, setAudioFilePath] = useState<string>('');

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

	return (
		<div className='container flex flex-col items-center p-4'>
			<h1 className='text-2xl text-center mb-8 tracking-widest'>
				create audio from text
			</h1>
			<h2>Enter your text and select a voice to create an audio clip.</h2>
			<form
				action={formAction}
				className='flex flex-col items-center mx-auto max-w-6xl'
			>
				<textarea
					name='text'
					placeholder="It was a queer, sultry summer, the summer they electrocuted the Rosenbergs, and I didn't know what I was doing in New York."
					className='textarea textarea-bordered w-full text-base my-4'
					rows={6}
					required
				/>
				<select
					name='voice_id'
					className='select select-secondary w-full max-w-xs'
					defaultValue='premade voices'
					required
				>
					<option disabled>Select a voice</option>
					{voices &&
						voices
							//* .filter((voice) => voice.category === 'premade')
							.map((voice) => (
								<option
									key={voice.voice_id}
									value={voice.voice_id}
									title={Object.values(voice.labels).join(', ')}
								>
									{voice.name}
								</option>
							))}
				</select>
				<SubmitButton text='create audio' className='mt-4 max-w-fit' />
			</form>
			{audioFilePath && <audio src={`/${audioFilePath}`} controls />}
		</div>
	);
}
