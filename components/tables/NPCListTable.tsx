'use client';
import {useCallback, useMemo, useState} from 'react';
import {deleteNPCAction} from '@/actions/db/NPCs';
import {DeleteModal} from '../DeleteModal';
import Link from 'next/link';
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
	SortDescriptor,
	Input,
} from '@nextui-org/react';
import {DeleteIcon, SearchIcon} from '../icons';
import {truncateText} from '@/utils/helpers/formHelpers';
import {DetailedNPC} from '@/types/drizzle';

export const NPCListTable = ({npcs}: {npcs: DetailedNPC[]}) => {
	const [filterValue, setFilterValue] = useState('');
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: 'npc_name',
		direction: 'ascending',
	});
	const [page, setPage] = useState(1);

	const rowsPerPage = 5;
	const pages = Math.ceil(npcs.length / rowsPerPage);

	const hasSearchFilter = Boolean(filterValue);

	//Items filtered by search value
	const filteredItems = useMemo(() => {
		let filteredNPCs = [...npcs];

		if (hasSearchFilter) {
			filteredNPCs = filteredNPCs.filter((npc) =>
				npc.npc_name.toLowerCase().includes(filterValue.toLowerCase())
			);
		}
		return filteredNPCs;
	}, [npcs, filterValue]);

	//Paginated Items
	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems.slice(start, end);
	}, [page, filteredItems]);

	//Sorted Items
	const sortedItems = useMemo(() => {
		return [...items].sort((a: DetailedNPC, b: DetailedNPC) => {
			const first = a[sortDescriptor.column as keyof DetailedNPC] as number;
			const second = b[sortDescriptor.column as keyof DetailedNPC] as number;
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === 'descending' ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);

	const onSearchChange = useCallback((value?: string) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue('');
		}
	}, []);

	const onClear = useCallback(() => {
		setFilterValue('');
		setPage(1);
	}, []);

	const renderCell = useCallback((npc: DetailedNPC, columnKey: React.Key) => {
		switch (columnKey) {
			case 'npc_name':
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

	//Search bar
	const topContent = useMemo(() => {
		return (
			<div className='flex flex-col gap-4'>
				<div className='flex justify-between gap-3 items-end'>
					<Input
						isClearable
						className='w-full sm:max-w-[44%]'
						placeholder='Search by name...'
						startContent={<SearchIcon />}
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
				</div>
			</div>
		);
	}, [filterValue, onSearchChange, npcs.length, hasSearchFilter]);

	//Pagination UI
	const bottomContent = useMemo(() => {
		return (
			<div className='flex w-full justify-center'>
				<Pagination
					showControls
					showShadow
					color='secondary'
					page={page}
					total={pages}
					onChange={setPage}
				/>
			</div>
		);
	}, [page, pages, items.length, hasSearchFilter]);

	console.log('SORTED ITEMS:', sortedItems);
	return (
		<Table
			isHeaderSticky
			isStriped
			aria-label='NPCs Table'
			classNames={{
				wrapper: 'p-0 rounded-none',
			}}
			sortDescriptor={sortDescriptor}
			topContent={topContent}
			topContentPlacement='outside'
			bottomContent={bottomContent}
			bottomContentPlacement='outside'
			onSortChange={setSortDescriptor}
		>
			<TableHeader>
				<TableColumn allowsSorting key='npc_name'>
					NAME
				</TableColumn>
				<TableColumn key='description'>DESCRIPTION</TableColumn>
				<TableColumn key='campaigns'>CAMPAIGNS</TableColumn>
				<TableColumn allowsSorting key='created_at'>
					CREATED AT
				</TableColumn>
				<TableColumn key='actions'> ACTIONS </TableColumn>
			</TableHeader>
			<TableBody items={sortedItems} emptyContent={'No NPCs to display.'}>
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
