'use client';

import {DetailedNPC} from '@/types/drizzle';
import {ElevenLabsVoice} from '@/types/elevenlabs';
import AddVoiceToNPCForm from '../forms/AddVoiceToNPCForm';
import {VoiceOption} from '../VoiceOption';

export default function OverviewTab({
	npc,
	npcVoice,
	allVoices,
}: {
	npc: DetailedNPC;
	npcVoice?: ElevenLabsVoice | null;
	allVoices: ElevenLabsVoice[];
}) {
	return (
		<div className='card bg-base-200'>
			<div className='card-body'>
				<h2 className='card-title'>{npc.npc_name}</h2>
				<p>{npc.description}</p>
				{npcVoice ? (
					<>
						<h3>{npc.npc_name}'s voice</h3>
					</>
				) : (
					<>
						<h3>{npc.npc_name} has no voice! Choose one:</h3>
						<AddVoiceToNPCForm npc_id={npc.id} voiceOptions={allVoices} />
					</>
				)}
			</div>
		</div>
	);
}
