import {getUsername} from '@/actions/auth';
import DialogueForm from '@/components/forms/DialogueForm';
import {getNPCsWithCampaigns} from '@/database/drizzle/queries';
import {redirect} from 'next/navigation';
import {getDialogueTypes} from '@/database/drizzle/queries';
import {transformDialogueOptions} from '@/utils/helpers/formHelpers';

export default async function CreateNPCDialoguePage({
	params,
}: {
	params: {username: string; npcId: number};
}) {
	const username = await getUsername();
	if (!username) return redirect('/login');
	if (username !== params.username) return <p>Unauthorized</p>;

	const npcs = await getNPCsWithCampaigns();
	const npc = npcs?.find((npc) => npc.npc.id === params.npcId);
	if (!npc) return <p>NPC not found</p>;
	const dialogueTypes = await getDialogueTypes();
	const dialogueOptions = transformDialogueOptions(dialogueTypes);

	return (
		<div>
			<h1>Create NPC Dialogue</h1>
			<DialogueForm dialogueTypes={dialogueOptions} npcId={npc.npc.id} />
		</div>
	);
}
