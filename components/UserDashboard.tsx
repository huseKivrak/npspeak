'use client';
import {CampaignWithNPCs, DetailedNPC} from '@/types/drizzle';
import {CampaignListTable} from './CampaignListTable';
import {NPCListTable} from './NPCListTable';
import {Tabs, Tab, Chip, Button} from '@nextui-org/react';
import {useState} from 'react';
import NPCForm from './forms/NPCForm';
import CampaignForm from './forms/CampaignForm';
import {ElevenLabsVoice} from '@/types/elevenlabs';
import {PlusIcon} from './icons/PlusIcon';
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
				variant='light'
				color='success'
				classNames={{
					tabList:
						'gap-3 w-full relative rounded-none p-0 border-b border-divider',
					cursor: 'w-full',
					tab: 'max-w-full px-0 h-12',
					tabContent: '',
				}}
			>
				<Tab
					key='campaigns'
					title={
						<div className='flex items-center space-x-2'>
							<span>Campaigns</span>
							<Chip size='sm' variant='flat'>
								{campaigns?.length}
							</Chip>
						</div>
					}
				>
					<Button
						size='lg'
						variant='flat'
						color='secondary'
						className='mb-4 justify-end'
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
							<span>NPCs</span>
							<Chip size='sm' variant='flat'>
								{npcs?.length}
							</Chip>
						</div>
					}
				>
					<Button
						size='lg'
						variant='flat'
						color='primary'
						className='mb-4'
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
