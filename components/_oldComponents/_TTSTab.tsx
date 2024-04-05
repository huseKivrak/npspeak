'use client';

import TTSForm from '../forms/TTSForm';
import {createTTSFormOptions} from '@/utils/formatHelpers';
import {DetailedNPC} from '@/types/drizzle';
import {ElevenLabsVoice} from '@/types/elevenlabs';
import {ELEVENLABS_PREMADE_VOICES} from '@/utils/elevenlabs/api';

export default function TTSTab({
	npc,
	allVoices = ELEVENLABS_PREMADE_VOICES,
}: {
	npc: DetailedNPC;
	allVoices: ElevenLabsVoice[];
}) {
	const ttsFormOptions = createTTSFormOptions(npc.dialogues);

	return (
		<div className='card bg-base-200'>
			<div className='card-body'>
				<h2 className='card-title '>TTS</h2>
				<TTSForm
					ttsDialogueOptions={ttsFormOptions}
					npc={npc}
					voices={allVoices}
				/>
			</div>
		</div>
	);
}
