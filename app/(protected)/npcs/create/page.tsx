import { NPCForm } from '@/components/forms/NPCForm';
import { getUserProfile } from '@/actions/auth';
import { redirect } from 'next/navigation';
import { getCampaignsWithNPCs } from '@/database/drizzle/queries';
import { transformCampaignOptions } from '@/utils/helpers/formHelpers';
import { getAllElevenLabsVoices } from '@/actions/elevenLabs';
export default async function CreateCampaignPage() {
  const { user } = await getUserProfile();
  if (!user) {
    redirect('/login');
  }
  const campaignsResponse = await getCampaignsWithNPCs();
  const campaigns =
    campaignsResponse.status === 'success' ? campaignsResponse.data : [];
  const campaignOptions = campaigns ? transformCampaignOptions(campaigns) : [];

  const voicesResponse = await getAllElevenLabsVoices();
  const voices = voicesResponse.status === 'success' ? voicesResponse.data : [];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-semibold">create an NPC</h1>
      <NPCForm campaignOptions={campaignOptions} voiceOptions={voices} />
    </div>
  );
}
