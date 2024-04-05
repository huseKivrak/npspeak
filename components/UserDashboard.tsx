'use client';
import {CampaignWithNPCs, DetailedNPC} from '@/types/drizzle';
import {CampaignListTable} from './CampaignListTable';
import {NPCListTable} from './NPCListTable';
import {Tabs, Tab} from '@nextui-org/tabs';
import {Chip} from '@nextui-org/react';

export function UserDashboard({
	campaigns,
	npcs,
}: {
	campaigns: CampaignWithNPCs[] | null;
	npcs: DetailedNPC[] | null;
}) {
	return (
		<div className='flex w-full flex-col'>
			<Tabs
				aria-label='Options'
				size='lg'
				radius='sm'
				variant='light'
				color='success'
				classNames={{
					tabList:
						'gap-6 w-full relative rounded-none p-0 border-b border-divider',
					cursor: 'w-full',
					tab: ' px-2 h-12',
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
					{npcs && <NPCListTable npcs={npcs} />}
				</Tab>
			</Tabs>
		</div>
	);
}
