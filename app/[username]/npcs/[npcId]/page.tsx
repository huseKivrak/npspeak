import {redirect} from 'next/navigation';
import {getUserInfo} from '@/actions/auth';
import {getNPCById} from '@/database/drizzle/queries';
import {getDialogueTypes} from '@/database/drizzle/queries';
import DeleteNPCModal from '@/components/DeleteNPCModal';
import DialogueForm from '@/components/forms/DialogueForm';
import {transformDialogueOptions} from '@/utils/helpers/formHelpers';

export default async function NPCDetailPage({
	params,
}: {
	params: {
		username: string;
		npcId: number;
	};
}) {
	const {user} = await getUserInfo();
	if (!user) return redirect('/login');

	const npc = await getNPCById(params.npcId);
	console.log('NPC!: ', npc);
	if (!npc) return redirect('/404');
	if (npc.user_id !== user.id) return <p>Unauthorized</p>;

	const dialogueTypes = await getDialogueTypes();
	const dialogueOptions = transformDialogueOptions(dialogueTypes);
	return (
		<div>
			<h1>{npc.npc_name}</h1>
			<p>{npc.description}</p>
			<DialogueForm npcId={npc.id} dialogueOptions={dialogueOptions} />
			<DeleteNPCModal id={npc.id} />
		</div>
	);
}
