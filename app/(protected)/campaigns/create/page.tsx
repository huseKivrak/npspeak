import CampaignForm from '@/components/forms/CampaignForm';
import { getUserProfile } from '@/actions/auth';
import { redirect } from 'next/navigation';
import { getAllDetailedNPCs } from '@/database/drizzle/queries';
import { DetailedNPC } from '@/types/drizzle';

export default async function CreateCampaignPage() {
  const { user } = await getUserProfile();
  if (!user) {
    redirect('/login');
  }
  const npcsResponse = await getAllDetailedNPCs(user.id);
  const npcs: DetailedNPC[] =
    npcsResponse.status === 'success' ? npcsResponse.data : [];
  const npcOptions = npcs?.map((npc) => ({
    label: npc.npc_name,
    value: npc.id,
  }));

  return (
    <div className="flex flex-col gap-4">
      <CampaignForm npcOptions={npcOptions} />
    </div>
  );
}
