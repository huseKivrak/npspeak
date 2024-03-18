'use client';

import {useState, useEffect} from 'react';
import {DetailedNPC} from '@/types/drizzle';
import {getNPCOverviewTabData} from '@/actions/npcTabData';
import {ElevenLabsVoice} from '@/types/elevenlabs';

export default function OverviewTab({npc}: {npc: DetailedNPC}) {
	const [isLoading, setIsLoading] = useState(true);
	const [npcVoice, setNpcVoice] = useState<ElevenLabsVoice | null>(null);
	const [npcStats, setNpcStats] = useState({});

	useEffect(() => {
		const fetchNPCInfo = async () => {
			const response = await getNPCOverviewTabData(npc);
			if (response.status !== 'success') {
				console.error(response);
				return;
			}
			const {voiceInfo, stats} = response.data;
			if (voiceInfo.status !== 'success') {
				console.error(voiceInfo);
			}
			setNpcVoice(voiceInfo.data);
			setNpcStats(stats.data);
			setIsLoading(false);
		};
		fetchNPCInfo();
	}, []);

	if (isLoading) {
		return <p>Loading...</p>;
	}
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

						<h4>Preview:</h4>
						<audio src={npcVoice.preview_url} controls />
					</>
				)}
			</div>
		</div>
	);
}
