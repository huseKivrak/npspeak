'use client';
import {useCallback, useMemo, useState} from 'react';
import {DetailedNPC} from '@/types/drizzle';
import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
	Chip,
	Tooltip,
	Pagination,
} from '@nextui-org/react';
import {DeleteIcon} from './icons/DeleteIcon';
import {DeleteModal} from './DeleteModal';
import {deleteNPCAction} from '@/actions/db/NPCs';
import Link from 'next/link';
import {truncateText} from '@/utils/helpers/formHelpers';

export const NPCListTable = ({npcs}: {npcs: DetailedNPC[]}) => {
	const [page, setPage] = useState(1);
	const rowsPerPage = 5;
	const pages = Math.ceil(npcs.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		return npcs.slice(start, end);
	}, [page, npcs]);

	type NPC = (typeof npcs)[0];
	const renderCell = useCallback((npc: NPC, columnKey: React.Key) => {
		switch (columnKey) {
			case 'name':
				return (
					<div className='flex flex-col'>
						<p className='text-large font-semibold capitalize hover:underline'>
							<Link href={`/npcs/${npc.id}`}>{npc.npc_name}</Link>
						</p>
					</div>
				);
			case 'description':
				return (
					<div className='flex flex-col'>
						<Tooltip
							delay={500}
							closeDelay={0}
							content={npc.description}
							className='max-w-sm'
						>
							<p className='text-small capitalize'>
								{truncateText(npc.description ?? '', 30)}
							</p>
						</Tooltip>
					</div>
				);
			case 'campaigns':
				return (
					<div className='flex flex-col'>
						{npc.campaigns.map((campaign) => (
							<Link key={campaign.id} href={`/campaigns/${campaign.id}`}>
								<Chip
									key={campaign.id}
									size='md'
									color='primary'
									variant='flat'
									className='hover:underline hover:bg-primary-200'
								>
									{truncateText(campaign.campaign_name ?? '', 40)}
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
				wrapper: 'p-0 rounded-none',
			}}
			bottomContent={
				<div className='flex w-full justify-center'>
					<Pagination
						showControls
						showShadow
						color='secondary'
						page={page}
						total={pages}
						onChange={(page) => setPage(page)}
					/>
				</div>
			}
			bottomContentPlacement='outside'
		>
			<TableHeader>
				<TableColumn key='name'>NAME</TableColumn>
				<TableColumn key='description'>DESCRIPTION</TableColumn>
				<TableColumn key='campaigns'> CAMPAIGNS </TableColumn>
				<TableColumn key='created_at'> CREATED AT </TableColumn>
				<TableColumn key='actions'> ACTIONS </TableColumn>
			</TableHeader>
			<TableBody items={items} emptyContent={'No NPCs to display.'}>
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
