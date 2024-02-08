'use client';
import {SubmitButton} from '@/components/buttons/SubmitButton';
import {useFormState} from 'react-dom';
import {CreateAudioClip} from '@/server-actions/elevenLabs';
import {useState, useEffect} from 'react';
import {ELEVENLABS_PREMADE_VOICES} from '@/utils/elevenlabs/api';
import {ElevenLabsVoice} from '@/types/elevenlabs';

const initialState = {
	message: '',
	audioUrl: '',
};

/**
 * tts form page
 *
 */
export default function TextToSpeechPage() {
	const [state, formAction] = useFormState(CreateAudioClip, initialState);
	const [voices, setVoices] = useState<ElevenLabsVoice[]>(
		ELEVENLABS_PREMADE_VOICES
	); //*
	const [audioFilePath, setAudioFilePath] = useState<string>('');

	//*
	// useEffect(() => {
	//   async function getVoices() {
	//     const res = await fetch('/api/voices');
	//     const data = await res.json();
	//     const voices: ElevenLabsVoice[] = data.voices;

	//     setVoices(voices);
	//   }
	//   getVoices();
	// }, []);

	useEffect(() => {
		if (state?.audioUrl) {
			setAudioFilePath(state.audioUrl);
		}
	}, [state?.audioUrl]);

	return (
		<div className='container flex flex-col items-center p-4 mt-48'>
			<h1 className='text-2xl text-center mb-8 tracking-widest'>
				create audio from text
			</h1>
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
					required
				>
					<option disabled selected>
						Premade Voice Options
					</option>
					{voices
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
