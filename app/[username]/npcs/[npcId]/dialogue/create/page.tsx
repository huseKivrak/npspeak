import {getUserInfo} from '@/actions/auth';
import DialogueForm from '@/components/forms/DialogueForm';
import {getNPCById} from '@/database/drizzle/queries';
import {redirect} from 'next/navigation';
import {getDialogueTypes} from '@/database/drizzle/queries';
import {transformDialogueTypeOptions} from '@/utils/helpers/formHelpers';

export default async function CreateNPCDialoguePage({
	params,
}: {
	params: {username: string; npcId: number};
}) {
	const {user} = await getUserInfo();
	if (!user) return redirect('/login');
	if (user.username !== params.username) return <p>Unauthorized</p>;

	const npc = await getNPCById(params.npcId);
	if (!npc) return <p>NPC not found</p>;
	if (npc.user_id !== user.id) return <p>Unauthorized</p>;

	const dialogueTypes = await getDialogueTypes();
	const dialogueOptions = transformDialogueTypeOptions(dialogueTypes);

	return (
		<div>
			<h1>Create NPC Dialogue</h1>
			<DialogueForm dialogueOptions={dialogueOptions} npcId={npc.id} />
		</div>
	);
}
