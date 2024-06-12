import { NPCForm } from '@/components/forms/NPCForm';
import { getUserInfo } from '@/actions/auth';
import { redirect } from 'next/navigation';
import { getCampaignsWithNPCs } from '@/database/drizzle/queries';
import {
  transformCampaignOptions,
  transformVoiceOptions,
} from '@/utils/helpers/formHelpers';
import { getAllElevenLabsVoices } from '@/actions/elevenLabs';
export default async function CreateCampaignPage() {
  const { user } = await getUserInfo();
  if (!user) {
    redirect('/login');
  }
  const campaignsResponse = await getCampaignsWithNPCs();
  const campaigns =
    campaignsResponse.status === 'success' ? campaignsResponse.data : [];
  const campaignOptions = campaigns ? transformCampaignOptions(campaigns) : [];

  const voicesResponse = await getAllElevenLabsVoices();
  const voices = voicesResponse.status === 'success' ? voicesResponse.data : [];
  const voiceOptions = transformVoiceOptions(voices);

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="underline">Create a New NPC</h1>
      <NPCForm campaignOptions={campaignOptions} voiceOptions={voiceOptions} />
    </div>
  );
}
