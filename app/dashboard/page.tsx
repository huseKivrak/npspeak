import { getUserInfo } from '@/actions/auth'
import {
  getCampaignsWithNPCs,
  getNPCsWithRelatedData,
} from '../../database/drizzle/queries'
import { redirect } from 'next/navigation'
import { UserDashboard } from '@/components/UserDashboard'
import { getAllElevenLabsVoices } from '@/actions/elevenLabs'

export default async function UserPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) {
  const { user } = await getUserInfo()
  if (!user) return redirect('/login')

  const campaignResponse = await getCampaignsWithNPCs()
  const campaigns =
    campaignResponse.status === 'success' ? campaignResponse.data : []
  const npcsResponse = await getNPCsWithRelatedData()
  const npcs = npcsResponse.status === 'success' ? npcsResponse.data : []
  const voiceResponse = await getAllElevenLabsVoices()
  const voices = voiceResponse.status === 'success' ? voiceResponse.data : []

  return (
    <div className="flex flex-col">
      <UserDashboard campaigns={campaigns} npcs={npcs} voices={voices} />
    </div>
  )
}
