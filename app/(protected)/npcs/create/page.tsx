import { NPCForm } from '@/components/forms/NPCForm';
import { getUserProfile } from '@/actions/auth';
import { redirect } from 'next/navigation';
import { getAllCampaigns } from '@/database/drizzle/queries';
import { transformCampaignOptions } from '@/utils/helpers/formatHelpers';
import { getAllElevenLabsVoices } from '@/actions/elevenLabs';
import { getErrorRedirect } from '@/utils/helpers/vercel';
import { redirectIfDemoUser } from '@/utils/permissions';

export default async function CreateNPCPage() {
  const { user } = await getUserProfile();
  if (!user) {
    redirect('/login');
  }
  redirectIfDemoUser(user.id, '/campaigns/52', 'demo user cannot create NPCs.');

  const campaignsResponse = await getAllCampaigns(user.id);
  const campaignOptions =
    campaignsResponse.status === 'success' && campaignsResponse.data.length > 0
      ? transformCampaignOptions(campaignsResponse.data)
      : [];

  const voicesResponse = await getAllElevenLabsVoices();
  if (voicesResponse.status !== 'success') {
    const redirectPath = getErrorRedirect('/npcs/create', 'error', 'unable to get voices');
    redirect(redirectPath);
  }
  const voices = voicesResponse.data;

  return (
    <div className="flex flex-col gap-4">
      <NPCForm campaignOptions={campaignOptions} voiceOptions={voices} />
    </div>
  );
}