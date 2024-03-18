'use client';
import {DetailedNPC} from '@/types/drizzle';
import {useState, useEffect} from 'react';
import {cn} from '@/utils/helpers/clsxMerge';

export default function NPCTabCard({
	npc,
	overviewTab,
	dialogueTab,
	campaignTab,
	ttsTab,
	deleteTab,
}: {
	npc: DetailedNPC;
	overviewTab: React.ReactNode;
	dialogueTab: React.ReactNode;
	campaignTab: React.ReactNode;
	ttsTab: React.ReactNode;
	deleteTab: React.ReactNode;
}) {
	const [activeTab, setActiveTab] = useState('overview');

	const tabs = {
		overview: overviewTab,
		dialogue: dialogueTab,
		campaign: campaignTab,
		tts: ttsTab,
		delete: deleteTab,
	};

	return (
		<div className='flex justify-center items-center'>
			<div role='tablist' className='tabs tabs-boxed tabs-lg rounded-box'>
				{Object.keys(tabs).map((tab) => (
					<button
						key={tab}
						className={`tab tab-lg ${activeTab === tab ? 'tab-active' : ''}`}
						onClick={() => setActiveTab(tab)}
					>
						{tab}
					</button>
				))}
				{tabs[activeTab as keyof typeof tabs]}
			</div>
		</div>
	);
}
