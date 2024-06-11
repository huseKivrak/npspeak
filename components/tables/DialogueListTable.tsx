'use client';
import { useCallback, useMemo, useState } from 'react';
import { DetailedDialogue, DetailedNPC } from '@/types/drizzle';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/table';
import { Tooltip } from '@nextui-org/tooltip';
import { DialogueIcon } from '../icons';
import { DeleteModal } from '../forms/modals/DeleteModal';
import { deleteDialogueAction } from '@/actions/db/dialogue';
import { PiMicrophoneSlashBold } from 'react-icons/pi';
import { TTSModal } from '../forms/modals/TTSModal';
import { Button, Pagination, Switch } from '@nextui-org/react';
import { capitalize } from '@/utils/formatHelpers';
import {
  FaChessBoard,
  FaMicrophoneLines,
  FaRegTrashCan,
} from 'react-icons/fa6';

export const DialogueListTable = ({
  dialogues,
  voiceId,
}: {
  dialogues: DetailedDialogue[];
  voiceId: string;
}) => {
  const [selectMode, setSelectMode] = useState(false);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(dialogues.length / rowsPerPage);

  const columns = [
    { name: 'TYPE', uid: 'type' },
    { name: 'TEXT', uid: 'text' },
    { name: 'AUDIO', uid: 'audio' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  //formats dialogues and sorts audio to top rows
  const rows = dialogues
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

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows]);

  const topContent = useMemo(() => {
    return (
      <div className="flex">
        <Switch isSelected={selectMode} onValueChange={setSelectMode} />
        {selectMode && (
          <div className="flex space-x-4">
            <Button variant="light">
              <FaMicrophoneLines color="green" />
            </Button>
            <Button variant="light">
              <FaChessBoard color="yellow" />
            </Button>
            <Button variant="light">
              <FaRegTrashCan color="red" />
            </Button>
          </div>
        )}
      </div>
    );
  }, [selectMode]);

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

  type Dialogue = (typeof rows)[0];
  const renderCell = useCallback(
    (dialogue: Dialogue, columnKey: React.Key) => {
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
            <div className="flex flex-col">
              {dialogue.audio ? (
                <audio src={dialogue.audio} controls />
              ) : (
                <div className="">
                  <div className="flex justify-center items-center gap-2 ">
                    <PiMicrophoneSlashBold />
                  </div>
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
                className=""
              />
            </div>
          );
        default:
          return null;
      }
    },
    [voiceId]
  );

  return (
    <Table
      isHeaderSticky
      aria-label="Dialogue Table"
      topContent={topContent}
      bottomContent={bottomContent}
      selectionMode={selectMode ? 'multiple' : 'none'}
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
