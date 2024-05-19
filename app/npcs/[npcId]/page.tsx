import { redirect } from 'next/navigation';
import { getUserInfo } from '@/actions/auth';
import { getDetailedDialogues, getNPCsWithRelatedData } from '@/database/drizzle/queries';
import { getPresignedDownloadURL } from '@/actions/s3';
import { DetailedNPC, DetailedDialogue, SoundboardDialogue } from '@/types/drizzle';
import { NPCDetail } from '@/components/NPCDetail';
import { formatDialoguesForSoundboard } from '@/utils/formatHelpers';
export default async function NPCDetailPage({
	params,
}: {
	params: {
		npcId: number;
	};
}) {
	const { user } = await getUserInfo();
	if (!user) return redirect('/login');

	const npcResponse = await getNPCsWithRelatedData(params.npcId);
	const npc: DetailedNPC = npcResponse.status === 'success' ? npcResponse.data : [];
	if (npc.user_id !== user.id) return <p>Unauthorized</p>;
	if (!npc) return <p>NPC not found</p>;

	const dialogueResponse = await getDetailedDialogues(npc.id);
	const dialogues = dialogueResponse.status === 'success' ? dialogueResponse.data : [];

	await Promise.all(
		dialogues.map(async (d: DetailedDialogue) => {
			try {
				const fileKey = d.audioFileKey;
				if (!fileKey) return;

				const response = await getPresignedDownloadURL(fileKey);
				if (response.status === 'success') {
					return (d.audioURL = response.data);
				} else {
					return (d.audioURL = null);
				}
			} catch (error) {
				console.error(error);
				return;
			}
		})
	);
	return <NPCDetail npc={npc} dialogues={dialogues} />;
}
