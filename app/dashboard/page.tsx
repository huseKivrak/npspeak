import UserDashboard from '../../components/UserDashboard';
import {getUserFromSession} from '../../actions/auth';
import {
	getCampaignsWithNPCs,
	getNPCsWithCampaigns,
} from '../../database/drizzle/queries';
import {redirect} from 'next/navigation';

export default async function UserPage() {
	const user = await getUserFromSession();
	if (!user) redirect('/login');
	const campaigns = await getCampaignsWithNPCs();
	const npcs = await getNPCsWithCampaigns();

	return (
		<div>
			<UserDashboard user={user} campaigns={campaigns} npcs={npcs} />
		</div>
	);
}
