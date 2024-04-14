'use client';
import {CampaignWithNPCs, DetailedNPC} from '@/types/drizzle';
import {CampaignListTable} from './tables/CampaignListTable';
import {NPCListTable} from './tables/NPCListTable';
import {Tabs, Tab, Chip, Button} from '@nextui-org/react';
import {useState} from 'react';
import {NPCForm} from './forms/NPCForm';
import CampaignForm from './forms/CampaignForm';
import {ElevenLabsVoice} from '@/types/elevenlabs';
import {PlusIcon} from './icons';
import {
	transformNPCOptions,
	transformCampaignOptions,
} from '@/utils/helpers/formHelpers';
export function UserDashboard({
	campaigns,
	npcs,
	voices,
}: {
	campaigns: CampaignWithNPCs[] | null;
	npcs: DetailedNPC[] | null;
	voices: ElevenLabsVoice[];
}) {
	const [showNPCForm, setShowNPCForm] = useState(false);
	const [showCampaignForm, setShowCampaignForm] = useState(false);

	const npcOptions = transformNPCOptions(npcs ?? []);
	const campaignOptions = transformCampaignOptions(campaigns ?? []);
	return (
		<div className='flex flex-col w-full'>
			<Tabs
				aria-label='Options'
				size='lg'
				radius='sm'
				variant='solid'
				color='success'
				classNames={{
					tabList:
						'gap-3 w-full relative rounded-none p-0 border-b border-divider',
					cursor: 'w-full',
					tab: 'max-w-full px-0 h-12',
					tabContent: 'text-2xl',
				}}
			>
				<Tab
					key='campaigns'
					title={
						<div className='flex items-center space-x-2'>
							<span>CAMPAIGN</span>
							<Chip size='lg' variant='flat'>
								{campaigns?.length}
							</Chip>
						</div>
					}
				>
					<Button
						size='sm'
						variant='flat'
						color='secondary'
						className='mb-2'
						startContent={!showCampaignForm && <PlusIcon />}
						onClick={() => setShowCampaignForm(!showCampaignForm)}
					>
						{showCampaignForm ? 'Close' : 'Add Campaign'}
					</Button>
					{showCampaignForm && <CampaignForm npcOptions={npcOptions} />}
					{campaigns && <CampaignListTable campaigns={campaigns} />}
				</Tab>
				<Tab
					key='npcs'
					title={
						<div className='flex items-center space-x-2'>
							<span>NPC</span>
							<Chip size='lg' variant='flat'>
								{npcs?.length}
							</Chip>
						</div>
					}
				>
					<Button
						size='sm'
						variant='flat'
						color='primary'
						className='mb-2'
						startContent={!showNPCForm && <PlusIcon />}
						onClick={() => setShowNPCForm(!showNPCForm)}
					>
						{showNPCForm ? 'Close' : 'Add NPC'}
					</Button>
					{showNPCForm && (
						<NPCForm voiceOptions={voices} campaignOptions={campaignOptions} />
					)}
					{npcs && <NPCListTable npcs={npcs} />}
				</Tab>
			</Tabs>
		</div>
	);
}
