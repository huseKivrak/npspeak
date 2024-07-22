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
  Tooltip,
  Pagination,
  SortDescriptor,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { deleteCampaignAction } from '@/actions/db/campaigns';
import Link from 'next/link';
import { DeleteModal } from '../forms/modals/DeleteModal';
import { SearchBar } from './SearchBar';
import { truncateText } from '@/utils/helpers/formHelpers';
import { FaEdit } from 'react-icons/fa';
import { tableStyles } from '@/styles/tableStyles';

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
                <Dropdown
                  classNames={{
                    content: 'border border-default',
                  }}
                >
                  <DropdownTrigger>
                    <Button variant="light" size="sm">
                      {campaign.npcs.length} NPCs
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu>
                    {campaign.npcs.map((npc) => (
                      <DropdownItem key={npc.id}>
                        <Link href={`/npcs/${npc.id}`}>{npc.npc_name}</Link>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
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
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit Campaign">
                <Link href={`/campaigns/${campaign.id}/edit`}>
                  <FaEdit />
                </Link>
              </Tooltip>
              <DeleteModal
                idName="campaign_id"
                serverAction={deleteCampaignAction}
                id={campaign.id}
              />
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
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      onSortChange={setSortDescriptor}
      classNames={tableStyles}
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
          <TableRow
            key={item.id}
            className="text-white group-data-[selected=true]:text-white"
          >
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
