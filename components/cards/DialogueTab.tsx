'use client';
import AddDialogueInTab from './AddDialogueInTab';
import {DetailedNPC, DetailedDialogue} from '@/types/drizzle';
import {DialogueIcon} from '@/components/icons/DialogueIcon';

export default function DialogueTab({
	npc,
	detailedDialogues,
}: {
	npc: DetailedNPC;
	detailedDialogues: DetailedDialogue[];
}) {
	return (
		<div className='card bg-base-200'>
			<div className='card-body'>
				<h1>{npc.npc_name}'s dialogue</h1>
				<ul>
					{detailedDialogues.map((d) => {
						return (
							<li key={d.id}>
								{DialogueIcon(d.dialogueType)}
								<p>{d.text}</p>
								{d.audioURL && <audio src={d.audioURL} controls />}
							</li>
						);
					})}
				</ul>
				<AddDialogueInTab npcId={npc.id} />
			</div>
		</div>
	);
}
