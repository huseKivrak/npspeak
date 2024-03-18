'use client';
import AddDialogueInTab from './AddDialogueInTab';
import {DetailedNPC} from '@/types/drizzle';
import {useState, useEffect} from 'react';
import {getNPCDialogueTabData} from '@/actions/npcTabData';
import {StyledDialogueWithAudioURL} from '@/types/drizzle';

export default function DialogueTab({npc}: {npc: DetailedNPC}) {
	const [detailedDialogues, setDetailedDialogues] = useState<
		StyledDialogueWithAudioURL[]
	>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchDialogueData = async () => {
			const response = await getNPCDialogueTabData(npc);
			if (response.status === 'success') {
				setDetailedDialogues(response.data);
				setIsLoading(false);
			}
		};
		fetchDialogueData();
	}, []);

	return (
		<div className='card bg-base-200'>
			<div className='card-body'>
				<h2 className='card-title'>{npc.npc_name}'s dialogue</h2>
				{isLoading && <span className='loading loading-ball loading-lg'></span>}
				{!isLoading && detailedDialogues && (
					<ul>
						{detailedDialogues.map((d) => {
							return (
								<li key={d.id}>
									<p>{d.text}</p>
									{d.audioURL && <audio src={d.audioURL} controls />}
								</li>
							);
						})}
					</ul>
				)}
				<AddDialogueInTab npcId={npc.id} />
			</div>
		</div>
	);
}
