'use client';
import { useCallback, useMemo, useState } from 'react';
import { deleteNPCAction } from '@/actions/db/NPCs';
import { DeleteModal } from '../forms/modals/DeleteModal';
import { SearchBar } from './SearchBar';
import Link from 'next/link';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
  SortDescriptor,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';

import { DetailedNPC } from '@/types/drizzle';
import { FaEdit, FaExternalLinkAlt } from 'react-icons/fa';

export const NPCListTable = ({ npcs }: { npcs: DetailedNPC[] }) => {
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
  }, [npcs, filterValue, hasSearchFilter]);

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
          <div className="flex flex-col">
            <p className="text-lg capitalize hover:underline">
              <Link href={`/npcs/${npc.id}`}>{npc.npc_name}</Link>
            </p>
          </div>
        );
      case 'description':
        return (
          <div className="flex flex-col">
            <Tooltip
              delay={500}
              closeDelay={0}
              content={npc.description}
              className="max-w-sm"
            >
              <p className=" capitalize truncate max-w-xs h-8">
                {npc.description}
              </p>
            </Tooltip>
          </div>
        );
      case 'campaigns':
        return (
          <div className="flex flex-col gap-1">
            {npc.campaigns.length > 0 ? (
              <Dropdown
                classNames={{
                  content: 'border border-default',
                }}
              >
                <DropdownTrigger>
                  <Button variant="light" size="sm">
                    {npc.campaigns.length} Campaigns{' '}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  {npc.campaigns.map((campaign) => (
                    <DropdownItem key={campaign.id}>
                      <Link
                        href={`/campaigns/${campaign.id}`}
                        className="flex items-center gap-1 text-sm"
                      >
                        {campaign.campaign_name}
                        <FaExternalLinkAlt />
                      </Link>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : (
              <p className="text-tiny"> No Campaigns</p>
            )}
          </div>
        );
      case 'created_at':
        return (
          <div className="flex flex-col">
            <p className=" capitalize">
              {new Date(npc.created_at).toLocaleDateString()}
            </p>
          </div>
        );
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit NPC">
              <Link href={`/npcs/${npc.id}/edit`}>
                <FaEdit />
              </Link>
            </Tooltip>

            <DeleteModal
              idName="npc_id"
              serverAction={deleteNPCAction}
              id={npc.id}
            />
          </div>
        );
      default:
        return null;
    }
  }, []);

  //Search bar
  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-2">
        <SearchBar
          filterValue={filterValue}
          onValueChange={onSearchChange}
          onClear={onClear}
        />
      </div>
    );
  }, [filterValue, onSearchChange, onClear]);

  //Pagination UI
  const bottomContent = useMemo(() => {
    return (
      <div className="flex w-full justify-center bg-transparent">
        <Pagination
          page={page}
          total={pages}
          onChange={setPage}
          classNames={{
            wrapper: 'gap-2 bg-transparent',
            item: 'bg-transparent text-large',
            cursor: 'text-large',
          }}
        />
      </div>
    );
  }, [page, pages]);

  return (
    <Table
      isHeaderSticky
      aria-label="NPCs Table"
      classNames={{
        wrapper: 'p-0 rounded-sm min-h-[382px] max-h-[382px] max-w-screen',
        th: ['border-b', 'border-divider'],
        td: [
          'group-data-[first=true]:first:before:rounded-none',
          'group-data-[first=true]:last:before:rounded-none',

          'group-data-[middle=true]:before:rounded-none',

          'group-data-[last=true]:first:before:rounded-none',
          'group-data-[last=true]:last:before:rounded-none',
        ],
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader className="">
        <TableColumn allowsSorting align="center" key="npc_name" maxWidth={48}>
          Name
        </TableColumn>
        <TableColumn key="description" align="center" maxWidth={48}>
          Description
        </TableColumn>
        <TableColumn key="campaigns" align="center" maxWidth={48}>
          Campaigns
        </TableColumn>
        <TableColumn allowsSorting align="center" key="created_at">
          Created
        </TableColumn>
        <TableColumn key="actions"> Actions </TableColumn>
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
