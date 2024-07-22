import CampaignForm from '@/components/forms/CampaignForm';
import { getUserProfile } from '@/actions/auth';
import { redirect } from 'next/navigation';
import { getNPCsWithRelatedData } from '@/database/drizzle/queries';
import { DetailedNPC } from '@/types/drizzle';

export default async function CreateCampaignPage() {
  const { user } = await getUserProfile();
  if (!user) {
    redirect('/login');
  }
  const npcsResponse = await getNPCsWithRelatedData();
  const npcs: DetailedNPC[] =
    npcsResponse.status === 'success' ? npcsResponse.data : [];
  const npcOptions = npcs?.map((npc) => ({
    label: npc.npc_name,
    value: npc.id,
  }));

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="mb-4 font-bold tracking-widest underline">
        create a new campaign
      </h1>
      <CampaignForm npcOptions={npcOptions} />
    </div>
  );
}
