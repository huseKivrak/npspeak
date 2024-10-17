'use client';
import { useCallback, useMemo, useState } from 'react';
import { DetailedDialogue, DialogueRow } from '@/types/drizzle';
import { Tooltip } from '@nextui-org/tooltip';
import { RenderIcon } from '@/utils/renderIcon';
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
  SharedSelection,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Card,
  CardBody,
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
import { truncateText } from '@/utils/helpers/formatHelpers';
import { DownloadButton } from '../buttons/DownloadButton';
import { DialogueModal } from '../forms/modals/DialogueModal';
import { usePathname } from 'next/navigation';

export const DialogueListTable = ({
  dialogues,
  voiceId,
}: {
  dialogues: DetailedDialogue[];
  voiceId: string;
}) => {
  const [ selectedKeys, setSelectedKeys ] = useState<Selection>(new Set([]));
  const [ audioFilter, setAudioFilter ] = useState<Selection>('all');
  const [ typeFilter, setTypeFilter ] = useState<Selection>('all');
  const [ rowsPerPage, setRowsPerPage ] = useState<Selection>(new Set([ '5' ]));
  const [ page, setPage ] = useState(1);

  const pathname = usePathname();
  const npcId = Number(pathname.split('/')[ 2 ]);

  const itemsPerPage = useMemo(
    () => Number(Array.from(rowsPerPage).join(', ').replaceAll('_', ' ')),
    [ rowsPerPage ]
  );
  const pages = Math.ceil(dialogues.length / Number(itemsPerPage));

  const hasSelectedDialogues = selectedKeys === 'all' || selectedKeys.size > 0;

  const audioOptions = [
    { name: 'with', uid: 'withAudio' },
    { name: 'without', uid: 'noAudio' },
  ];

  const typeOptions = [
    { name: 'greeting', uid: 'greeting' },
    { name: 'farewell', uid: 'farewell' },
    { name: 'story', uid: 'story' },
    { name: 'question', uid: 'question' },
    { name: 'answer', uid: 'answer' },
    { name: 'exclamation', uid: 'exclamation' },
    { name: 'other', uid: 'other' },
  ];

  const rowsPerPageOptions = [
    { name: '5', uid: 5 },
    { name: '10', uid: 10 },
    { name: '15', uid: 15 },
  ];
  const filteredItems = useMemo(() => {
    let filteredDialogues = [ ...dialogues ];

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

    if (
      typeFilter !== 'all' &&
      Array.from(typeFilter).length !== typeOptions.length
    ) {
      filteredDialogues = filteredDialogues.filter((dialogue) =>
        Array.from(typeFilter).includes(dialogue.dialogueType!)
      );
    }

    return filteredDialogues;
  }, [ dialogues, audioFilter, typeFilter ]);

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

  const onRowsPerPageChange = useCallback((keys: SharedSelection) => {
    const rowsPerPage = Array.from(keys).join(', ').replaceAll('_', ' ');
    setRowsPerPage(new Set([ rowsPerPage ]));
    setPage(1);
  }, []);

  const items = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return rows.slice(start, end);
  }, [ page, rows, rowsPerPage ]);

  const topContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between font-mono py-2 md:py-4 px-2 sm:px-4 shadow-small">
        <div className="flex flex-col">
          <div className="flex sm:gap-4 lg:gap-8">
            <Tooltip
              content="Create audio for selected dialogues"
              placement="top-end"
            >
              <Button
                isIconOnly
                variant="light"
                isDisabled={!hasSelectedDialogues}
              >
                <FaMicrophoneLines className="text-success" size={24} />
              </Button>
            </Tooltip>
            <Tooltip
              content="Create soundboard for selected dialogues"
              placement="top"
            >
              <Button
                isIconOnly
                variant="light"
                isDisabled={!hasSelectedDialogues}
              >
                <FaChessBoard className="text-secondary" size={24} />
              </Button>
            </Tooltip>
            <Tooltip
              content="Delete selected dialogues"
              className="text-danger"
              placement="top-start"
            >
              <Button
                isIconOnly
                variant="light"
                isDisabled={!hasSelectedDialogues}
              >
                <FaRegTrashCan className="text-danger" size={24} />
              </Button>
            </Tooltip>
          </div>
        </div>

        <div className="flex gap-4 ">
          <Dropdown classNames={{ content: [ 'flex min-w-[20px]' ] }}>
            <DropdownTrigger className="flex max-w-xs md:w-[120px]">
              <Button
                endContent={<FaChevronDown className="text-xs md:text-sm" />}
                variant="flat"
              >
                <span className="text-tiny md:text-small">type</span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="type filter"
              closeOnSelect={false}
              selectedKeys={typeFilter}
              selectionMode="multiple"
              onSelectionChange={setTypeFilter}
            >
              {typeOptions.map((option) => (
                <DropdownItem key={option.uid}>{option.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Dropdown
            classNames={{
              content: [ 'flex min-w-[20px]' ],
            }}
          >
            <DropdownTrigger className="flex max-w-xs md:w-[120px]">
              <Button
                endContent={<FaChevronDown className="text-xs md:text-sm" />}
                variant="flat"
              >
                <span className="text-tiny md:text-small">audio</span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="audio filter"
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

          <Dropdown
            classNames={{
              content: [ 'flex min-w-[20px]' ],
            }}
          >
            <DropdownTrigger className="hidden sm:flex md:w-[100px]">
              <Button
                endContent={<FaChevronDown className="text-xs sm:text-sm" />}
                variant="flat"
              >
                <span className="text-small">rows</span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Rows"
              selectionMode="single"
              selectedKeys={rowsPerPage}
              onSelectionChange={onRowsPerPageChange}
            >
              {rowsPerPageOptions.map((option) => (
                <DropdownItem key={option.uid}>{option.name}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    );
  }, [ audioFilter, dialogues.length, selectedKeys, rowsPerPage, typeFilter ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex w-full items-center justify-center bg-transparent">
        <Pagination
          isCompact
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
  }, [ page, pages, selectedKeys, items.length ]);

  const renderCell = useCallback(
    (dialogue: DialogueRow, columnKey: React.Key) => {
      switch (columnKey) {
        case 'type':
          return (
            <Tooltip
              content={capitalize(dialogue.type)}
              delay={200}
              closeDelay={200}
            >
              <div className="flex justify-center">
                <RenderIcon iconName={dialogue.type} isDialogue />
              </div>
            </Tooltip>
          );
        case 'text':
          return (
            <div className="">
              <Popover>
                <PopoverTrigger className="sm:hidden">
                  <Button variant="light">
                    <span className="underline text-start">
                      {truncateText(dialogue.text, 8)}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex items-center justify-center p-2 max-w-xs">
                  <span className="italic">{dialogue.text}</span>
                </PopoverContent>
              </Popover>

              {dialogue.text.length > 50 ? (
                <Tooltip
                  content={
                    <Card className="flex flex-col max-w-xs">
                      <CardBody>
                        <span className="italic">{dialogue.text}</span>
                      </CardBody>
                    </Card>
                  }
                >
                  <span className="hidden sm:flex italic">
                    {truncateText(dialogue.text, 50)}
                  </span>
                </Tooltip>
              ) : (
                <span className="hidden sm:flex italic">
                  {truncateText(dialogue.text, 50)}
                </span>
              )}
            </div>
          );
        case 'audio':
          return (
            <div className="flex flex-col items-center">
              {dialogue.audio ? (
                <AudioButton src={dialogue.audio} />
              ) : (
                <FaMicrophoneSlash size={24} className="text-default" />
              )}
            </div>
          );
        case 'actions':
          return (
            <div className="relative flex justify-center gap-2">
              {!dialogue.audio ? (
                <TTSModal
                  voiceId={voiceId}
                  npcId={dialogue.npc_id!}
                  dialogueId={dialogue.id}
                  text={dialogue.text}
                />
              ) : (
                <DownloadButton dialogue={dialogue} />
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
    },
    []
  );

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
      <TableHeader>
        <TableColumn align="start" key="type">
          TYPE
        </TableColumn>
        <TableColumn align="start" key="text">
          TEXT
        </TableColumn>
        <TableColumn align="center" key="audio">
          AUDIO
        </TableColumn>
        <TableColumn align="center" key="actions">
          ACTIONS
        </TableColumn>
      </TableHeader>
      <TableBody
        items={items}
        emptyContent={
          <div className="flex flex-col items-center justify-center gap-4">
            <span className="text-lg font-mono">
              this NPC has no dialogue yet.
            </span>
            <DialogueModal npcId={npcId} className="" />
          </div>
        }
      >
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
