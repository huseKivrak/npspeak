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
		<div className='flex flex-col w-full'>
			<h2 className='text-xl font-bold tracking-wide self-start'>
				Sample some voices:
			</h2>
			<VoiceSelect
				control={control}
				voiceOptions={voices}
				onVoiceChange={handleVoiceChange}
			/>
			<div className='flex gap-2 mt-4'>
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
		</div>
	);
};
