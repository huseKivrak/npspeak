import { notFound, redirect } from 'next/navigation';
import { getUserProfile } from '@/actions/auth';
import {
  getDetailedDialogues,
  getNPCsWithRelatedData,
} from '@/database/drizzle/queries';
import { getPresignedDownloadURL } from '@/actions/s3';
import { DetailedNPC, DetailedDialogue } from '@/types/drizzle';
import { NPCDetail } from '@/components/views/NPCDetail';
import UnauthorizedError from '@/components/UnauthorizedError';
export default async function NPCDetailPage({
  params,
}: {
  params: {
    npcId: number;
  };
}) {
  const { user } = await getUserProfile();
  if (!user) return redirect('/login');

  const npcResponse = await getNPCsWithRelatedData(params.npcId);
  if (npcResponse.status !== 'success') notFound();

  const npc: DetailedNPC = npcResponse.data;
  if (npc.user_id !== user.id)
    return (
      <UnauthorizedError resource="NPC" returnURL="/npcs" returnLabel="NPCs" />
    );

  const dialogueResponse = await getDetailedDialogues(npc.id);
  if (dialogueResponse.status !== 'success')
    return <p>{dialogueResponse.message}</p>;
  const npcDialogues: DetailedDialogue[] = dialogueResponse.data;

  const dialoguesWithAudio = npcDialogues.map(async (d) => {
    if (!d.audioFileKey) return d;
    const response = await getPresignedDownloadURL(d.audioFileKey);
    d.audioURL = response.status === 'success' ? response.data : null;
    return d;
  });

  //todo: handle rejecteds?
  const dialogues = (await Promise.allSettled(dialoguesWithAudio))
    .filter(
      (d): d is PromiseFulfilledResult<DetailedDialogue> =>
        d.status === 'fulfilled'
    )
    .map((d) => d.value);

  return (
    <div className="flex flex-col w-full">
      <NPCDetail npc={npc} dialogues={dialogues} />
    </div>
  );
}
