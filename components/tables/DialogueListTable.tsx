'use client';
import {useCallback} from 'react';
import {DetailedDialogue, DetailedNPC} from '@/types/drizzle';
import {
	Table,
	TableHeader,
	TableBody,
	TableColumn,
	TableRow,
	TableCell,
} from '@nextui-org/table';
import {Tooltip} from '@nextui-org/tooltip';
import {DeleteIcon} from '../icons';
import {DialogueIcon} from '../icons';
import {DeleteModal} from '../DeleteModal';
import {deleteDialogueAction} from '@/actions/db/dialogue';
import {PiMicrophoneSlashBold} from 'react-icons/pi';
import {TTSModal} from '../TTSModal';
export const DialogueListTable = ({
	dialogues,
	voiceId,
}: {
	dialogues: DetailedDialogue[];
	voiceId: string;
}) => {
	const columns = [
		{name: 'TYPE', uid: 'type'},
		{name: 'TEXT', uid: 'text'},
		{name: 'AUDIO', uid: 'audio'},
		{name: 'ACTIONS', uid: 'actions'},
	];

	const rows = dialogues.map((dialogue) => ({
		id: dialogue.id,
		type: dialogue.dialogueType || 'other',
		text: dialogue.text,
		audio: dialogue.audioURL,
		npc_id: dialogue.npc_id,
		voice_id: voiceId,
	}));

	type Dialogue = (typeof rows)[0];
	const renderCell = useCallback((dialogue: Dialogue, columnKey: React.Key) => {
		switch (columnKey) {
			case 'type':
				return (
					<div className='flex flex-col items-center'>
						<Tooltip
							content={dialogue.type}
							color='success'
							delay={200}
							closeDelay={200}
						>
							<DialogueIcon dialogueType={dialogue.type} />
						</Tooltip>
					</div>
				);
			case 'text':
				return (
					<div className='flex flex-col'>
						<p className='text-bold text-tiny capitalize'>{dialogue.text}</p>
					</div>
				);
			case 'audio':
				return (
					<div className='flex flex-col'>
						{dialogue.audio ? (
							<audio src={dialogue.audio} controls />
						) : (
							<div className=''>
								<div className='flex justify-center items-center gap-2 text-default-400'>
									<PiMicrophoneSlashBold />
									<p className='text-tiny'>This dialogue has no audio.</p>
								</div>
							</div>
						)}
					</div>
				);
			case 'actions':
				return (
					<div className='relative flex justify-center gap-2'>
						{!dialogue.audio && (
							<TTSModal
								voiceId={voiceId}
								npcId={dialogue.npc_id!}
								dialogueId={dialogue.id}
								text={dialogue.text}
							>
								<Tooltip color='success' content='Create Audio' />
							</TTSModal>
						)}

						<DeleteModal
							idName='dialogue_id'
							serverAction={deleteDialogueAction}
							id={dialogue.id}
							className=''
						>
							<Tooltip color='danger' content='Delete Dialogue'>
								<DeleteIcon className='text-danger' />
							</Tooltip>
						</DeleteModal>
					</div>
				);
			default:
				return null;
		}
	}, []);

	return (
		<Table
			isHeaderSticky
			isStriped
			aria-label='Dialogue Table'
			classNames={{
				wrapper: 'max-h-[382px] p-0 rounded-none',
			}}
		>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === 'actions' ? 'center' : 'start'}
						className='bg-primary text-lg tracking-widest text-white font-light'
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={rows} emptyContent={'No dialogues to display.'}>
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
