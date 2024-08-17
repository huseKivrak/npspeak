import { getUserProfile } from '@/actions/auth';
import {
  getCampaignsWithNPCs,
  getNPCsWithRelatedData,
} from '@/database/drizzle/queries';
import { redirect } from 'next/navigation';
import { UserDashboard } from '@/components/views/UserDashboard';

export default async function UserPage() {
  const { user } = await getUserProfile();
  if (!user) return redirect('/login');

  const campaignResponse = await getCampaignsWithNPCs();
  const campaigns =
    campaignResponse.status === 'success' ? campaignResponse.data : [];
  const npcsResponse = await getNPCsWithRelatedData();
  const npcs = npcsResponse.status === 'success' ? npcsResponse.data : [];

  return (
    <div className="flex flex-col">
      <UserDashboard user={user} campaigns={campaigns} npcs={npcs} />
    </div>
  );
}
