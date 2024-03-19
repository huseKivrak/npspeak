'use client';

import {DetailedNPC} from '@/types/drizzle';
import {useState} from 'react';
import TTSTab from './TTSTab';
import DialogueTab from './DialogueTab';
import OverviewTab from './OverviewTab';
import CampaignTab from './CampaignTab';
import DeleteTab from './DeleteTab';
import {ActionStatus} from '@/types/drizzle';

export default function NPCTabListCard({
	npc,
	allTabData,
}: {
	npc: DetailedNPC;
	allTabData: {
		overviewTab: ActionStatus;
		dialogueTab: ActionStatus;
		allVoices: ActionStatus;
	};
}) {
	const [activeTab, setActiveTab] = useState('overview');
	const {overviewTab, dialogueTab, allVoices} = allTabData;
	const overviewData =
		overviewTab.status === 'success' ? overviewTab.data : null;
	const dialogueData =
		dialogueTab.status === 'success' ? dialogueTab.data : null;
	const allVoicesData = allVoices.status === 'success' ? allVoices.data : null;

	return (
		<div className=''>
			<div className='join'>
				<input
					className='join-item btn btn-square btn-lg w-fit p-4'
					type='radio'
					name='options'
					aria-label='overview'
					onClick={() => setActiveTab('overview')}
				/>
				<input
					className='join-item btn btn-square btn-lg w-fit p-4'
					type='radio'
					name='options'
					aria-label='dialogue'
					onClick={() => setActiveTab('dialogue')}
				/>
				<input
					className='join-item btn btn-square btn-lg w-fit p-4'
					type='radio'
					name='options'
					aria-label='tts'
					onClick={() => setActiveTab('tts')}
				/>
				<input
					className='join-item btn btn-square btn-lg w-fit p-4'
					type='radio'
					name='options'
					aria-label='campaigns'
					onClick={() => setActiveTab('campaign')}
				/>
				<input
					className='join-item btn btn-square btn-lg w-fit p-4'
					type='radio'
					name='options'
					aria-label='delete'
					onClick={() => setActiveTab('delete')}
				/>
			</div>
			<div className=''>
				{activeTab === 'overview' && (
					<OverviewTab
						npc={npc}
						npcVoice={overviewData}
						allVoices={allVoicesData}
					/>
				)}
				{activeTab === 'tts' && <TTSTab npc={npc} allVoices={allVoicesData} />}
				{activeTab === 'dialogue' && (
					<DialogueTab npc={npc} detailedDialogues={dialogueData} />
				)}
				{activeTab === 'campaigns' && <CampaignTab npc={npc} />}
				{activeTab === 'delete' && <DeleteTab npcId={npc.id} />}
			</div>
		</div>
	);
}
