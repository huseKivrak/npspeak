'use client';
import {useCallback} from 'react';
import {CampaignWithNPCs} from '@/types/drizzle';
import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
	getKeyValue,
	Button,
	Chip,
	Tooltip,
} from '@nextui-org/react';
import {deleteCampaignAction} from '@/actions/db/campaigns';
import {DeleteIcon} from './icons/DeleteIcon';
import Link from 'next/link';
import {DeleteModal} from './DeleteModal';
export function CampaignListTable({
	campaigns,
}: {
	campaigns: CampaignWithNPCs[];
}) {
	const columns = [
		{name: 'NAME', uid: 'name'},
		{name: 'DESCRIPTION', uid: 'description'},
		{name: 'NPCS', uid: 'npcs'},
		{name: 'CREATED', uid: 'created_at'},
		{name: 'ACTIONS', uid: 'actions'},
	];

	const rows = campaigns.map((campaign) => ({
		id: campaign.id,
		name: campaign.campaign_name,
		description: campaign.description,
		npcs: campaign.npcs,
		created_at: campaign.created_at,
	}));
	type Campaign = (typeof rows)[0];
	const renderCell = useCallback((campaign: Campaign, columnKey: React.Key) => {
		switch (columnKey) {
			case 'name':
				return (
					<div className='flex flex-col'>
						<p className='font-semibold capitalize hover:underline'>
							<Link href={`/campaigns/${campaign.id}`}>{campaign.name}</Link>
						</p>
					</div>
				);
			case 'description':
				return (
					<div className='flex flex-col'>
						<p className='text-bold text-tiny capitalize'>
							{campaign.description}
						</p>
					</div>
				);
			case 'npcs':
				return (
					<div className='flex flex-col space-y-2 '>
						{campaign.npcs.map((npc) => (
							<Chip
								key={npc.id}
								size='sm'
								color='secondary'
								variant='flat'
								className='hover:underline hover:bg-secondary-200'
							>
								<Link key={npc.id} href={`/npcs/${npc.id}`}>
									{npc.npc_name}
								</Link>
							</Chip>
						))}
					</div>
				);
			case 'created_at':
				return (
					<div className='flex flex-col'>
						<p className='text-bold text-sm capitalize '>
							{new Date(campaign.created_at).toLocaleDateString()}
						</p>
					</div>
				);
			case 'actions':
				return (
					<div className='relative flex justify-center gap-2'>
						<DeleteModal
							idName='campaign_id'
							serverAction={deleteCampaignAction}
							id={campaign.id}
						>
							<Tooltip color='danger' content='Delete NPC'>
								<DeleteIcon className='text-danger' />
							</Tooltip>
						</DeleteModal>
					</div>
				);
			default:
				return null;
		}
	}, []);
	return (
		<Table
			isHeaderSticky
			isStriped
			aria-label='Campaigns Table'
			classNames={{
				wrapper: 'max-h-[382px] p-0 rounded-none',
			}}
		>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === 'actions' ? 'center' : 'start'}
						className='bg-secondary text-lg tracking-widest text-white font-light'
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={rows}>
				{(item) => (
					<TableRow key={item.id}>
						{(columnKey) => (
							<TableCell>{renderCell(item, columnKey)}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
