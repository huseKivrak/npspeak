'use client';
import { useCallback, useMemo, useState } from 'react';
import { CampaignWithNPCs } from '@/types/drizzle';
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
} from '@nextui-org/react';
import { deleteCampaignAction } from '@/actions/db/campaigns';
import { DeleteIcon } from '../icons';
import Link from 'next/link';
import { DeleteModal } from '../forms/modals/DeleteModal';
import { SearchBar } from './SearchBar';
import { truncateText } from '@/utils/helpers/formHelpers';

export function CampaignListTable({
  campaigns,
}: {
  campaigns: CampaignWithNPCs[];
}) {
  const [filterValue, setFilterValue] = useState('');
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'campaign_name',
    direction: 'ascending',
  });
  const [page, setPage] = useState(1);

  const rowsPerPage = 5;
  const pages = Math.ceil(campaigns.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  //Items filtered by search value
  const filteredItems = useMemo(() => {
    let filteredCampaigns = [...campaigns];

    if (hasSearchFilter) {
      filteredCampaigns = filteredCampaigns.filter((c) =>
        c.campaign_name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredCampaigns;
  }, [campaigns, filterValue, hasSearchFilter]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return campaigns.slice(start, end);
  }, [page, campaigns]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: CampaignWithNPCs, b: CampaignWithNPCs) => {
      const first = a[
        sortDescriptor.column as keyof CampaignWithNPCs
      ] as number;
      const second = b[
        sortDescriptor.column as keyof CampaignWithNPCs
      ] as number;
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

  const renderCell = useCallback(
    (campaign: CampaignWithNPCs, columnKey: React.Key) => {
      switch (columnKey) {
        case 'campaign_name':
          return (
            <div className="flex flex-col">
              <p className="capitalize hover:underline">
                <Link href={`/campaigns/${campaign.id}`}>
                  {campaign.campaign_name}
                </Link>
              </p>
            </div>
          );
        case 'description':
          return (
            <div className="flex flex-col">
              <Tooltip
                delay={500}
                closeDelay={0}
                content={campaign.description}
                className="max-w-xs"
              >
                <p className="text-tiny capitalize truncate max-w-xs h-8">
                  {campaign.description}
                </p>
              </Tooltip>
            </div>
          );
        case 'npcs':
          return (
            <div className="flex flex-col gap-1">
              {campaign.npcs.length > 0 ? (
                campaign.npcs.map((npc) => (
                  <Chip
                    key={npc.id}
                    size="sm"
                    color="success"
                    variant="flat"
                    className="hover:underline"
                  >
                    <Link
                      key={npc.id}
                      href={`/npcs/${npc.id}`}
                      className="text-tiny"
                    >
                      {truncateText(npc.npc_name ?? 'No NPCs.', 15)}
                    </Link>
                  </Chip>
                ))
              ) : (
                <p className="text-tiny"> No NPCs</p>
              )}
            </div>
          );
        case 'created_at':
          return (
            <div className="flex flex-col">
              <p className="text-tiny capitalize ">
                {new Date(campaign.created_at).toLocaleDateString()}
              </p>
            </div>
          );
        case 'actions':
          return (
            <div className="relative flex justify-center gap-2">
              <DeleteModal
                idName="campaign_id"
                serverAction={deleteCampaignAction}
                id={campaign.id}
              >
                <Tooltip color="danger" content="Delete NPC">
                  <DeleteIcon />
                </Tooltip>
              </DeleteModal>
            </div>
          );
        default:
          return null;
      }
    },
    []
  );

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

  const bottomContent = useMemo(() => {
    return (
      <div className="flex w-full justify-center">
        <Pagination
          variant="light"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
          classNames={{
            wrapper: 'gap-2 bg-transparent',
            item: 'bg-transparent text-large',
            cursor: ' text-large',
          }}
        />
      </div>
    );
  }, [page, pages]);

  return (
    <Table
      isHeaderSticky
      aria-label="Campaigns Table"
      classNames={{
        wrapper: 'p-0 rounded-sm min-h-[382px] max-h-[382px]',
        th: ['bg-primary', '', 'border-b', 'border-divider'],
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
        <TableColumn
          allowsSorting
          align="center"
          key="campaign_name"
          maxWidth={48}
        >
          Name
        </TableColumn>
        <TableColumn key="description" align="center" maxWidth={48}>
          Description
        </TableColumn>
        <TableColumn key="npcs" align="center" maxWidth={48}>
          NPCs
        </TableColumn>
        <TableColumn allowsSorting align="center" key="created_at">
          Created
        </TableColumn>
        <TableColumn key="actions">Actions</TableColumn>
      </TableHeader>
      <TableBody items={sortedItems} emptyContent={'No campaigns to display.'}>
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
