import { notFound, redirect } from 'next/navigation';
import { getUserProfile } from '@/actions/auth';
import { getDetailedNPC, getDetailedDialoguesByNPCId } from '@/database/drizzle/queries';
import { getPresignedDownloadURL } from '@/actions/s3';
import { DetailedNPC, DetailedDialogue } from '@/types/types';
import { NPCDetail } from '@/components/views/NPCDetail';

export default async function NPCDetailPage({
  params,
}: {
  params: {
    npcId: number;
  };
}) {
  const { user } = await getUserProfile();
  if (!user) return redirect('/login');

  const npcResponse = await getDetailedNPC(user.id, params.npcId);
  if (npcResponse.status !== 'success') notFound();

  const npc: DetailedNPC = npcResponse.data;

  const dialogueResponse = await getDetailedDialoguesByNPCId(user.id, npc.id);
  if (dialogueResponse.status !== 'success')
    return <p>{dialogueResponse.message}</p>;
  const npcDialogues: DetailedDialogue[] = dialogueResponse.data;

  const dialoguesWithAudio = npcDialogues.map(async (d) => {
    if (!d.audioFileKey) return d;
    const response = await getPresignedDownloadURL(d.audioFileKey);
    d.audioURL = response.status === 'success' ? response.data : null;
    return d;
  });

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
