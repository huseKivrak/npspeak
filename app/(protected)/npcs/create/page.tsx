import { NPCForm } from '@/components/forms/NPCForm';
import { getUserProfile } from '@/actions/auth';
import { redirect } from 'next/navigation';
import { getAllCampaigns } from '@/database/drizzle/queries';
import { transformCampaignOptions } from '@/utils/helpers/formatHelpers';
import { getErrorRedirect } from '@/utils/helpers/vercel';
import { fetchAndTransformVoices } from '@/utils/elevenlabs/server';

export default async function CreateNPCPage() {
  const { user } = await getUserProfile();
  if (!user) {
    redirect('/login');
  }

  const campaignsResponse = await getAllCampaigns(user.id);
  const campaignOptions =
    campaignsResponse.status === 'success' && campaignsResponse.data.length > 0
      ? transformCampaignOptions(campaignsResponse.data)
      : [];

  const voiceOptions = await fetchAndTransformVoices();
  if (voiceOptions.length === 0) {
    const redirectPath = getErrorRedirect(
      '/npcs/create',
      'error',
      'unable to get voices'
    );
    redirect(redirectPath);
  }

  return (
    <div className="flex flex-col gap-4">
      <NPCForm campaignOptions={campaignOptions} voiceOptions={voiceOptions} />
    </div>
  );
}