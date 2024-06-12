'use client';
import { useCallback, useMemo, useState } from 'react';
import { DetailedDialogue, DetailedNPC } from '@/types/drizzle';
import { Tooltip } from '@nextui-org/tooltip';
import { DialogueIcon } from '../icons';
import { DeleteModal } from '../forms/modals/DeleteModal';
import { deleteDialogueAction } from '@/actions/db/dialogue';
import { TTSModal } from '../forms/modals/TTSModal';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  Pagination,
  Selection,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { capitalize } from '@/utils/formatHelpers';
import {
  FaChessBoard,
  FaChevronDown,
  FaMicrophoneLines,
  FaMicrophoneSlash,
  FaRegTrashCan,
} from 'react-icons/fa6';

export const DialogueListTable = ({
  dialogues,
  voiceId,
}: {
  dialogues: DetailedDialogue[];
  voiceId: string;
}) => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [audioFilter, setAudioFilter] = useState<Selection>('all');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const pages = Math.ceil(dialogues.length / rowsPerPage);

  const columns = [
    { name: 'TYPE', uid: 'type' },
    { name: 'TEXT', uid: 'text' },
    { name: 'AUDIO', uid: 'audio' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  const hasSelectedDialogues = selectedKeys === 'all' || selectedKeys.size > 0;

  const audioOptions = [
    { name: 'With Audio', uid: 'withAudio' },
    { name: 'No Audio', uid: 'noAudio' },
  ];
  const filteredItems = useMemo(() => {
    let filteredDialogues = [...dialogues];

    if (
      audioFilter !== 'all' &&
      Array.from(audioFilter).length !== audioOptions.length
    ) {
      filteredDialogues = filteredDialogues.filter(
        (dialogue) =>
          (audioFilter.has('withAudio') && dialogue.audioURL) ||
          (audioFilter.has('noAudio') && !dialogue.audioURL)
      );
    }
    return filteredDialogues;
  }, [dialogues, audioFilter]);

  //formats dialogues and sorts audio to top rows
  const rows = filteredItems
    .map((dialogue) => {
      const { id, dialogueType, text, audioURL, npc_id } = dialogue;
      return {
        id,
        type: dialogueType || 'other',
        text,
        audio: audioURL,
        npc_id,
        voice_id: voiceId,
      };
    })
    .sort((a, b) => (b.audio ? 1 : 0) - (a.audio ? 1 : 0));

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows, rowsPerPage]);

  const topContent = useMemo(() => {
    return (
      <div className="flex justify-between space-x-4">
        <div>
          <Tooltip content="Create audio for selected dialogues">
            <Button variant="light" isDisabled={!hasSelectedDialogues}>
              <FaMicrophoneLines className="text-green-400" />
            </Button>
          </Tooltip>
          <Tooltip content="Create soundboard for selected dialogues">
            <Button variant="light" isDisabled={!hasSelectedDialogues}>
              <FaChessBoard className="text-purple-400" />
            </Button>
          </Tooltip>
          <Tooltip content="Delete selected dialogues" className="text-red-400">
            <Button variant="light" isDisabled={!hasSelectedDialogues}>
              <FaRegTrashCan className="text-red-400" />
            </Button>
          </Tooltip>
        </div>

        <div className="flex gap-4">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<FaChevronDown className="text-small" />}
                variant="ghost"
              >
                Audio
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={audioFilter}
              selectionMode="multiple"
              onSelectionChange={setAudioFilter}
            >
              {audioOptions.map((option) => (
                <DropdownItem key={option.uid}>{option.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select className="bg-transparent" onChange={onRowsPerPageChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [audioFilter, dialogues.length, selectedKeys]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex w-full justify-center bg-transparent">
        <Pagination
          showControls
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
  }, [page, pages, selectedKeys, items.length]);

  type Dialogue = (typeof rows)[0];
  const renderCell = useCallback((dialogue: Dialogue, columnKey: React.Key) => {
    switch (columnKey) {
      case 'type':
        return (
          <Tooltip
            content={capitalize(dialogue.type)}
            delay={200}
            closeDelay={200}
          >
            <div className="flex flex-col items-center">
              <DialogueIcon dialogueType={dialogue.type} />
            </div>
          </Tooltip>
        );
      case 'text':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize">{dialogue.text}</p>
          </div>
        );
      case 'audio':
        return (
          <div className="flex flex-col items-center">
            {dialogue.audio ? (
              <audio src={dialogue.audio} controls />
            ) : (
              <div className="flex items-center gap-2">
                <FaMicrophoneSlash />
                <span>This dialogue has no audio.</span>
              </div>
            )}
          </div>
        );
      case 'actions':
        return (
          <div className="relative flex justify-center gap-2">
            {!dialogue.audio && (
              <TTSModal
                voiceId={voiceId}
                npcId={dialogue.npc_id!}
                dialogueId={dialogue.id}
                text={dialogue.text}
              />
            )}
            <DeleteModal
              idName="dialogue_id"
              serverAction={deleteDialogueAction}
              id={dialogue.id}
            />
          </div>
        );
      default:
        return null;
    }
  }, []);

  const classNames = useMemo(
    () => ({
      wrapper: ['h-full', 'w-full'],
      th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      td: [
        // changing the rows border radius
        // first
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        // middle
        'group-data-[middle=true]:before:rounded-none',
        // last
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none',
      ],
    }),
    []
  );

  return (
    <Table
      isHeaderSticky
      aria-label="Dialogue Table"
      topContent={topContent}
      bottomContent={bottomContent}
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      classNames={classNames}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            className=" text-lg tracking-widest font-light"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items} emptyContent={'No dialogues to display.'}>
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
