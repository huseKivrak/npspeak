'use client';
import { useCallback, useMemo, useState } from 'react';
import { DetailedDialogue } from '@/types/drizzle';
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
import { capitalize } from '@/utils/helpers/formatHelpers';
import {
  FaChessBoard,
  FaChevronDown,
  FaMicrophoneLines,
  FaMicrophoneSlash,
  FaRegTrashCan,
} from 'react-icons/fa6';
import { AudioButton } from '../soundboard/AudioButton';
import { tableStyles } from '@/styles/tableStyles';
import { DialogueModal } from '../forms/modals/DialogueModal';

export const DialogueListTable = ({
  dialogues,
  voiceId,
  npcId,
}: {
  dialogues: DetailedDialogue[];
  voiceId: string;
  npcId: number;
}) => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [audioFilter, setAudioFilter] = useState<Selection>('all');
  const [rowsPerPage, setRowsPerPage] = useState(15);
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
      <div className="flex items-center justify-between font-mono px-4 shadow-small">
        <DialogueModal npcId={npcId} className="" />
        <div className="flex flex-col">
          <div>
            <Tooltip
              content="Create audio for selected dialogues"
              placement="top-end"
            >
              <Button variant="light" isDisabled={!hasSelectedDialogues}>
                <FaMicrophoneLines className="text-success" />
              </Button>
            </Tooltip>
            <Tooltip
              content="Create soundboard for selected dialogues"
              placement="top"
            >
              <Button variant="light" isDisabled={!hasSelectedDialogues}>
                <FaChessBoard className="text-secondary" />
              </Button>
            </Tooltip>
            <Tooltip
              content="Delete selected dialogues"
              className="text-danger"
              placement="top-start"
            >
              <Button variant="light" isDisabled={!hasSelectedDialogues}>
                <FaRegTrashCan className="text-danger" />
              </Button>
            </Tooltip>
          </div>
          {!hasSelectedDialogues && (
            <span className="self-center text-tiny font-grenze text-default">
              Select dialogues to perform actions.
            </span>
          )}
        </div>

        <div className="flex justify-evenly space-x-8">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<FaChevronDown className="text-tiny" />}
                variant="light"
                size="sm"
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
              variant="light"
            >
              {audioOptions.map((option) => (
                <DropdownItem key={option.uid}>{option.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {/* <label className="flex items-center"> */}

          <select onChange={onRowsPerPageChange} className="bg-transparent">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          {/* </label> */}
        </div>
      </div>
    );
  }, [audioFilter, dialogues.length, selectedKeys]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex w-full items-center justify-center bg-transparent">
        <Pagination
          page={page}
          total={pages}
          onChange={setPage}
          size="sm"
          color="secondary"
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
            <span className="">{dialogue.text}</span>
          </div>
        );
      case 'audio':
        return (
          <div className="flex flex-col items-center">
            {dialogue.audio ? (
              // <audio src={dialogue.audio} controls />
              <AudioButton src={dialogue.audio} />
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

  return (
    <Table
      aria-label="NPC Dialogue Table"
      topContent={topContent}
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      classNames={tableStyles}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            className="text-large font-semibold"
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
