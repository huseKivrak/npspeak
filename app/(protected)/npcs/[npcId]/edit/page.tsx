import { getUserProfile } from '@/actions/auth';
import { NPCForm } from '@/components/forms/NPCForm';
import { getAllCampaigns, getDetailedNPC } from '@/database/drizzle/queries';
import { DetailedNPC, UpdateNPC } from '@/types/types';
import { fetchAndTransformVoices } from '@/utils/elevenlabs/server';
import { transformCampaignOptions } from '@/utils/helpers/formatHelpers';
import { getErrorRedirect } from '@/utils/helpers/vercel';
import { redirectIfDemoUser } from '@/utils/permissions';
import { notFound, redirect } from 'next/navigation';

export default async function EditNPCPage({
  params,
}: {
  params: {
    npcId: number;
  };
}) {
  const { user } = await getUserProfile();
  if (!user) {
    return redirect('/login');
  }
  redirectIfDemoUser(user.id, '/campaigns/52', 'demo user cannot edit NPCs.');

  const voiceOptions = await fetchAndTransformVoices();
  if (voiceOptions.length === 0) {
    const redirectPath = getErrorRedirect(
      `/npcs/${params.npcId}/edit`,
      'error',
      'unable to get voices'
    );
    redirect(redirectPath);
  }

  const npcResponse = await getDetailedNPC(user.id, params.npcId);
  if (npcResponse.status !== 'success') notFound();

  const npc: DetailedNPC = npcResponse.data;
  const { id, npc_name, description, campaigns, voice_id } = npc;
  const campaignIds =
    campaigns.length > 0 ? campaigns.map((campaign) => campaign.id) : [];
  const editableNPC: UpdateNPC = {
    npc_id: id,
    npc_name,
    description: description ?? undefined,
    campaign_ids: campaignIds,
    voice_id: voice_id!,
  };

  const campaignResponse = await getAllCampaigns(user.id);
  const campaignOptions =
    campaignResponse.status === 'success'
      ? transformCampaignOptions(campaignResponse.data)
      : [];

  return (
    <div>
      <NPCForm
        voiceOptions={voiceOptions}
        npcToUpdate={editableNPC}
        campaignOptions={campaignOptions}
      />
    </div>
  );
}
