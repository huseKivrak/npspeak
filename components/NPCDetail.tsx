import {DialogueListTable} from '@/components/DialogueListTable';
import {DetailedDialogue, DetailedNPC} from '@/types/drizzle';
import {Divider} from '@nextui-org/divider';
import AddDialogueToNPC from './AddDialogueToNPC';
export function NPCDetail({
	npc,
	dialogues,
}: {
	npc: DetailedNPC;
	dialogues?: DetailedDialogue[];
}) {
	console.log('NPC DETAILED : ', npc);
	console.log('DIALOGUES : ', dialogues);
	return (
		<div className='flex w-full flex-col'>
			<div>
				<h1 className='text-white text-xl'>{npc.npc_name}</h1>
				<p className='text-white text-sm'>{npc.description}</p>
			</div>
			<Divider className='my-4' />
			<div className='flex flex-col gap-4 w-fit'>
				<h2 className='text-white text-xl'>Dialogues</h2>
				<AddDialogueToNPC npcId={npc.id} />
				{dialogues && (
					<DialogueListTable dialogues={dialogues} voiceId={npc.voice_id!} />
				)}
			</div>
		</div>
	);
}
