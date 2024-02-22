import UserDashboard from '../../components/UserDashboard';
import {getUserInfo} from '@/actions/auth';
import {
	getCampaignsWithNPCs,
	getNPCsWithCampaigns,
} from '../../database/drizzle/queries';
import {redirect} from 'next/navigation';
import {createClient} from '@/utils/supabase/server';
import {cookies} from 'next/headers';

export default async function UserPage() {
	const {user} = await getUserInfo();
	if (!user) return redirect('/login');

	const campaigns = await getCampaignsWithNPCs();
	const npcs = await getNPCsWithCampaigns();

	return (
		<div>
			<UserDashboard user={user} campaigns={campaigns} npcs={npcs} />
		</div>
	);
}
