import { getUserProfile } from '@/actions/auth';
import { getAllElevenLabsVoices } from '@/actions/elevenLabs';
import { NPCForm } from '@/components/forms/NPCForm';
import { getAllCampaigns, getDetailedNPC } from '@/database/drizzle/queries';
import { DetailedNPC, UpdateNPC } from '@/types/types';
import { transformCampaignOptions } from '@/utils/helpers/formatHelpers';
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

  const voiceResponse = await getAllElevenLabsVoices();
  const voices = voiceResponse.status === 'success' ? voiceResponse.data : '';

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
        voiceOptions={voices}
        npcToUpdate={editableNPC}
        campaignOptions={campaignOptions}
      />
    </div>
  );
}
