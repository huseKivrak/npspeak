'use client';
import {useCallback, useMemo, useState} from 'react';
import {CampaignWithNPCs} from '@/types/drizzle';
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
import {deleteCampaignAction} from '@/actions/db/campaigns';
import {DeleteIcon} from '../icons';
import Link from 'next/link';
import {DeleteModal} from '../DeleteModal';
import {truncateText} from '@/utils/helpers/formHelpers';

export function CampaignListTable({
	campaigns,
}: {
	campaigns: CampaignWithNPCs[];
}) {
	const [page, setPage] = useState(1);

	const rowsPerPage = 5;
	const pages = Math.ceil(campaigns.length / rowsPerPage);

	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		return campaigns.slice(start, end);
	}, [page, campaigns]);

	type Campaign = (typeof items)[0];
	const renderCell = useCallback((campaign: Campaign, columnKey: React.Key) => {
		switch (columnKey) {
			case 'name':
				return (
					<div className='flex flex-col'>
						<p className='text-large font-semibold capitalize hover:underline'>
							<Link href={`/campaigns/${campaign.id}`}>
								{campaign.campaign_name}
							</Link>
						</p>
					</div>
				);
			case 'description':
				return (
					<div className='flex flex-col'>
						<Tooltip
							delay={500}
							closeDelay={0}
							content={campaign.description}
							className='max-w-sm'
						>
							<p className='text-small capitalize'>
								{truncateText(campaign.description ?? '', 30)}
							</p>
						</Tooltip>
					</div>
				);
			case 'npcs':
				return (
					<div className='flex flex-col space-y-2 '>
						{campaign.npcs.map((npc) => (
							<Chip
								key={npc.id}
								size='md'
								color='secondary'
								variant='flat'
								className='hover:underline hover:bg-secondary-200'
							>
								<Link key={npc.id} href={`/npcs/${npc.id}`}>
									{truncateText(npc.npc_name ?? '', 40)}
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
				wrapper: 'p-0 rounded-none',
			}}
			bottomContent={
				<div className='flex w-full justify-center'>
					<Pagination
						showControls
						showShadow
						color='primary'
						page={page}
						total={pages}
						onChange={(page) => setPage(page)}
					/>
				</div>
			}
			bottomContentPlacement='outside'
		>
			<TableHeader>
				<TableColumn key='name'>Name</TableColumn>
				<TableColumn key='description'>Description</TableColumn>
				<TableColumn key='npcs'>NPCs</TableColumn>
				<TableColumn key='created_at'>Created</TableColumn>
				<TableColumn key='actions'>Actions</TableColumn>
			</TableHeader>
			<TableBody items={items} emptyContent={'No campaigns to display.'}>
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
