import { getUserProfile } from '@/actions/auth';
import { getAllCampaignsWithDetailedNPCs, getAllDetailedNPCs } from '@/database/drizzle/queries';
import { redirect } from 'next/navigation';
import { UserDashboard } from '@/components/views/UserDashboard';

export default async function UserPage() {
  const { user } = await getUserProfile();
  if (!user) return redirect('/login');

  const campaignResponse = await getAllCampaignsWithDetailedNPCs(user.id);
  const campaigns =
    campaignResponse.status === 'success' ? campaignResponse.data : null;
  const npcsResponse = await getAllDetailedNPCs(user.id);
  const npcs = npcsResponse.status === 'success' ? npcsResponse.data : null;

  return (
    <div className="flex flex-col">
      <UserDashboard user={user} campaigns={campaigns} npcs={npcs} />
    </div>
  );
}
