'use client';
import { useCallback, useMemo, useState } from 'react';
import { CampaignWithDetailedNPCs } from '@/types/types';
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
import { Link as NextUILink } from '@nextui-org/react';
import { DeleteModal } from '../forms/modals/DeleteModal';
import { SearchBar } from './SearchBar';
import { FaEdit } from 'react-icons/fa';
import { tableStyles } from '@/styles/tableStyles';

export function CampaignListTable({
  campaigns,
}: {
  campaigns: CampaignWithDetailedNPCs[];
}) {
  const [ filterValue, setFilterValue ] = useState('');
  const [ sortDescriptor, setSortDescriptor ] = useState<SortDescriptor>({
    column: 'campaign_name',
    direction: 'ascending',
  });
  const [ page, setPage ] = useState(1);

  const rowsPerPage = 5;
  const pages = Math.ceil(campaigns.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  //Items filtered by search value
  const filteredItems = useMemo(() => {
    let filteredCampaigns = [ ...campaigns ];

    if (hasSearchFilter) {
      filteredCampaigns = filteredCampaigns.filter((c) =>
        c.campaign_name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredCampaigns;
  }, [ campaigns, filterValue, hasSearchFilter ]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [ page, filteredItems ]);

  const sortedItems = useMemo(() => {
    return [ ...items ].sort((a: CampaignWithDetailedNPCs, b: CampaignWithDetailedNPCs) => {
      const first = a[
        sortDescriptor.column as keyof CampaignWithDetailedNPCs
      ] as number;
      const second = b[
        sortDescriptor.column as keyof CampaignWithDetailedNPCs
      ] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [ sortDescriptor, items ]);

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
    (campaign: CampaignWithDetailedNPCs, columnKey: React.Key) => {
      switch (columnKey) {
        case 'campaign_name':
          return (
            <NextUILink
              href={`/campaigns/${campaign.id}`}
              color="foreground"
              underline="hover"
            >
              <span className="tracking-tight leading-5 text-tiny md:text-large md:tracking-wide">
                {campaign.campaign_name}
              </span>
            </NextUILink>
          );
        case 'npcs':
          return (
            <div className="flex flex-col items-start justify-start gap-1">
              {campaign.npcs && campaign.npcs.length > 0 ? (
                <Dropdown
                  showArrow
                  classNames={{
                    content: 'p-0 border border-default',
                  }}
                >
                  <DropdownTrigger>
                    <Button variant="light" size="sm">
                      {`${campaign.npcs.length} ${campaign.npcs.length > 1 ? 'NPCs' : 'NPC'
                        }`}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    itemClasses={{
                      base: [
                        'transition-opacity',
                        'data-[hover=true]:text-foreground',
                        'data-[hover=true]:bg-default-200',
                        'dark:data-[hover=true]:bg-default-300',
                        'data-[selectable=true]:focus:bg-default-300',
                        'data-[pressed=true]:opacity-70',
                        'data-[focus-visible=true]:ring-default-500',
                      ],
                    }}
                  >
                    {campaign.npcs.map((npc) => (
                      <DropdownItem key={npc.id} href={`/npcs/${npc.id}`}>
                        <span className="">{npc.npc_name}</span>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <p className="text-tiny"> No NPCs</p>
              )}
            </div>
          );
        case 'actions':
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit Campaign">
                <NextUILink href={`/campaigns/${campaign.id}/edit`}>
                  <FaEdit />
                </NextUILink>
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
  }, [ filterValue, onSearchChange, onClear ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex w-full justify-center">
        <Pagination
          variant="light"
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
          color="secondary"
          classNames={{
            wrapper: 'gap-2 bg-transparent',
            item: 'bg-transparent text-large',
            cursor: ' text-large',
          }}
        />
      </div>
    );
  }, [ page, pages ]);

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
          align="start"
          key="campaign_name"
          maxWidth={48}
        >
          NAME
        </TableColumn>
        <TableColumn key="npcs" align="start" maxWidth={48}>
          NPCs
        </TableColumn>
        <TableColumn key="actions" align="center">
          ACTIONS
        </TableColumn>
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
