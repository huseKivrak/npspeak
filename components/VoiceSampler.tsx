'use client';

import {useState} from 'react';
import {VoiceSelect} from './forms/dropdown/VoiceSelect';
import {useForm} from 'react-hook-form';
import {ElevenLabsVoice} from '@/types/elevenlabs';
import {Checkbox} from '@nextui-org/checkbox';

export const VoiceSampler = ({voices}: {voices: ElevenLabsVoice[]}) => {
	const [selectedVoiceURL, setSelectedVoiceURL] = useState<string | null>(null);
	const [autoplay, setAutoplay] = useState(false);

	const handleVoiceChange = (voiceURL: string) => {
		setSelectedVoiceURL(voiceURL);
	};
	const {control} = useForm(); //just needed for VoiceSelect props

	return (
		<div className='flex flex-col max-w-sm px-4 items-start'>
			<h2>More than 50 voices to choose from.</h2>

			<p className='text-xl mt-4'>Listen to some samples:</p>
			<VoiceSelect
				control={control}
				voiceOptions={voices}
				onVoiceChange={handleVoiceChange}
			/>
			<div className='flex mt-2'>
				<audio src={selectedVoiceURL ?? ''} controls autoPlay={autoplay} />
				<Checkbox
					isSelected={autoplay}
					onValueChange={setAutoplay}
					color='danger'
					radius='lg'
					size='sm'
				>
					Autoplay
				</Checkbox>
			</div>
		</div>
	);
};
