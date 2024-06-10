import { NPCForm } from '@/components/forms/NPCForm'
import { getUserInfo } from '@/actions/auth'
import { redirect } from 'next/navigation'
import { getCampaignsWithNPCs } from '@/database/drizzle/queries'
import { transformCampaignOptions } from '@/utils/helpers/formHelpers'
import { getAllElevenLabsVoices } from '@/actions/elevenLabs'
export default async function CreateCampaignPage() {
  const { user } = await getUserInfo()
  if (!user) {
    redirect('/login')
  }
  const campaignsResponse = await getCampaignsWithNPCs()
  const campaigns =
    campaignsResponse.status === 'success' ? campaignsResponse.data : []
  const campaignOptions = campaigns ? transformCampaignOptions(campaigns) : []

  const voices = await getAllElevenLabsVoices()
  const voiceOptions = voices.status === 'success' ? voices.data : []
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold tracking-widest underline">Create a new NPC</h1>
      <NPCForm campaignOptions={campaignOptions} voiceOptions={voiceOptions} />
    </div>
  )
}
