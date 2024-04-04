'use client';
import {useCallback} from 'react';
import {DetailedNPC} from '@/types/drizzle';
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
import {DeleteIcon} from './icons/DeleteIcon';
import {DeleteModal} from './forms/DeleteModal';
import {deleteNPCAction} from '@/actions/db/NPCs';
import Link from 'next/link';

export const NPCListTable = ({npcs}: {npcs: DetailedNPC[]}) => {
	const columns = [
		{name: 'NAME', uid: 'name'},
		{name: 'DESCRIPTION', uid: 'description'},
		{name: 'CAMPAIGNS', uid: 'campaigns'},
		{name: 'CREATED', uid: 'created_at'},
		{name: 'ACTIONS', uid: 'actions'},
	];

	const rows = npcs.map((npc) => ({
		id: npc.id,
		name: npc.npc_name,
		description: npc.description,
		campaigns: npc.campaigns,
		created_at: npc.created_at,
	}));

	type NPC = (typeof rows)[0];
	const renderCell = useCallback((npc: NPC, columnKey: React.Key) => {
		switch (columnKey) {
			case 'name':
				return (
					<div className='flex flex-col'>
						<p className='font-semibold capitalize hover:underline'>
							<Link href={`/npcs/${npc.id}`}>{npc.name}</Link>
						</p>
					</div>
				);
			case 'description':
				return (
					<div className='flex flex-col'>
						<p className='text-bold text-tiny capitalize'>{npc.description}</p>
					</div>
				);
			case 'campaigns':
				return (
					<div className='flex flex-col'>
						{npc.campaigns.map((campaign) => (
							<Link key={campaign.id} href={`/campaigns/${campaign.id}`}>
								<Chip
									key={campaign.id}
									size='sm'
									color='primary'
									variant='flat'
									className='hover:underline hover:bg-primary-200'
								>
									{campaign.campaign_name.slice(0, 12) + '...'}
								</Chip>
							</Link>
						))}
					</div>
				);
			case 'created_at':
				return (
					<div className='flex flex-col'>
						<p className='text-bold text-sm capitalize'>
							{new Date(npc.created_at).toLocaleDateString()}
						</p>
					</div>
				);
			case 'actions':
				return (
					<div className='relative flex justify-center gap-2'>
						<DeleteModal
							idName='npc_id'
							serverAction={deleteNPCAction}
							id={npc.id}
							className=''
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
			aria-label='NPCs Table'
			classNames={{
				wrapper: 'max-h-[382px] p-0 rounded-none',
			}}
		>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === 'actions' ? 'center' : 'start'}
						className='bg-primary text-lg tracking-widest'
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={rows} emptyContent={'No NPCs to display.'}>
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
};
