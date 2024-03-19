'use client';

import {DetailedNPC} from '@/types/drizzle';
import {ElevenLabsVoice} from '@/types/elevenlabs';

export default function OverviewTab({
	npc,
	npcVoice,
}: {
	npc: DetailedNPC;
	npcVoice?: ElevenLabsVoice | null;
}) {
	return (
		<div className='card bg-base-200'>
			<div className='card-body'>
				<h2 className='card-title'>{npc.npc_name}</h2>
				<p>{npc.description}</p>
				{npcVoice && (
					<>
						<h3>{npc.npc_name}'s voice</h3>
						<ul>
							<li>Accent: {npcVoice.labels.accent}</li>
							<li>Description: {npcVoice.labels.description}</li>
							<li>Use case: {npcVoice.labels['use case']}</li>
							<li>Gender: {npcVoice.labels.gender}</li>
							<li>Age: {npcVoice.labels.age}</li>
						</ul>
					</>
				)}
			</div>
		</div>
	);
}
