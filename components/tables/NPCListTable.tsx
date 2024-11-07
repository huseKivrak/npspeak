'use client';
import { useCallback, useMemo, useState } from 'react';
import { deleteNPCAction } from '@/actions/db/NPCs';
import { DeleteModal } from '../forms/modals/DeleteModal';
import { SearchBar } from './SearchBar';
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
  Link as NextUILink,
} from '@nextui-org/react';

import { DetailedNPC } from '@/types/types';
import { FaEdit } from 'react-icons/fa';
import { tableStyles } from '@/styles/tableStyles';

export const NPCListTable = ({ npcs }: { npcs: DetailedNPC[]; }) => {
  const [ filterValue, setFilterValue ] = useState('');
  const [ sortDescriptor, setSortDescriptor ] = useState<SortDescriptor>({
    column: 'npc_name',
    direction: 'ascending',
  });
  const [ page, setPage ] = useState(1);

  const rowsPerPage = 5;
  const pages = Math.ceil(npcs.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  //Items filtered by search value
  const filteredItems = useMemo(() => {
    let filteredNPCs = [ ...npcs ];

    if (hasSearchFilter) {
      filteredNPCs = filteredNPCs.filter((npc) =>
        npc.npc_name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredNPCs;
  }, [ npcs, filterValue, hasSearchFilter ]);

  //Paginated Items
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [ page, filteredItems ]);

  //Sorted Items
  const sortedItems = useMemo(() => {
    return [ ...items ].sort((a: DetailedNPC, b: DetailedNPC) => {
      const first = a[ sortDescriptor.column as keyof DetailedNPC ] as number;
      const second = b[ sortDescriptor.column as keyof DetailedNPC ] as number;
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

  const renderCell = useCallback((npc: DetailedNPC, columnKey: React.Key) => {
    switch (columnKey) {
      case 'npc_name':
        return (
          <NextUILink
            href={`/npcs/${npc.id}`}
            underline="hover"
            color="foreground"
          >
            <span className="tracking-tight leading-5 text-tiny md:text-large md:tracking-wide">
              {npc.npc_name}
            </span>
          </NextUILink>
        );
      case 'campaigns':
        return (
          <div className="flex flex-col items-start justify-start gap-1">
            {npc.campaigns.length > 0 ? (
              <Dropdown
                showArrow
                classNames={{
                  content: 'p-0 border border-default',
                }}
              >
                <DropdownTrigger>
                  <Button variant="light" size="sm">
                    {`${npc.campaigns.length} ${npc.campaigns.length > 1 ? 'Campaigns' : 'Campaign'
                      }`}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  itemClasses={{
                    base: [
                      'transition-opacity',
                      'data-[hover=true]:text-foreground',
                      'data-[hover=true]:bg-default-300',
                      'dark:data-[hover=true]:bg-default-200',
                      'data-[selectable=true]:focus:bg-default-300',
                      'data-[pressed=true]:opacity-70',
                      'data-[focus-visible=true]:ring-default-500',
                    ],
                  }}
                >
                  {npc.campaigns.map((campaign) => (
                    <DropdownItem
                      key={campaign.id}
                      href={`/campaigns/${campaign.id}`}
                    >
                      <span className="text-small">
                        {campaign.campaign_name}
                      </span>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : (
              <p className="text-tiny"> No Campaigns</p>
            )}
          </div>
        );

      case 'actions':
        return (
          <div className="relative flex justify-center gap-2">
            <Tooltip content="Edit">
              <NextUILink href={`/npcs/${npc.id}/edit`}>
                <FaEdit size={24} className='text-default' aria-label='Edit NPC' />
              </NextUILink>
            </Tooltip>

            <DeleteModal
              idName="npc_id"
              serverAction={deleteNPCAction}
              id={npc.id}
              isDisabled={npc.is_default}
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
      <div className="flex flex-col gap-2 p-2">
        <SearchBar
          filterValue={filterValue}
          onValueChange={onSearchChange}
          onClear={onClear}
        />
      </div>
    );
  }, [ filterValue, onSearchChange, onClear ]);

  //Pagination UI
  const bottomContent = useMemo(() => {
    return (
      <div className="flex w-full justify-center bg-transparent">
        <Pagination
          page={page}
          total={pages}
          onChange={setPage}
          color="secondary"
          classNames={{
            wrapper: 'gap-2 bg-transparent',
            item: 'bg-transparent text-large',
            cursor: 'text-large',
          }}
        />
      </div>
    );
  }, [ page, pages ]);

  return (
    <Table
      isHeaderSticky
      aria-label="NPCs Table"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      onSortChange={setSortDescriptor}
      classNames={tableStyles}
    >
      <TableHeader>
        <TableColumn allowsSorting align="start" key="npc_name" maxWidth={48}>
          NAME
        </TableColumn>
        <TableColumn key="campaigns" align="start" maxWidth={48}>
          CAMPAIGNS
        </TableColumn>

        <TableColumn key="actions" align="center">
          ACTIONS
        </TableColumn>
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
