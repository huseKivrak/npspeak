import UserDashboard from '../../components/UserDashboard';
import {getUserFromSession} from '../../actions/auth';
import {
	getCampaignsAndNPCs,
	getNPCsWithCampaignsAction,
} from '../../database/drizzle/queries';
import {redirect} from 'next/navigation';

export default async function UserPage() {
	const user = await getUserFromSession();
	if (!user) redirect('/login');
	const campaigns = await getCampaignsAndNPCs();
	const npcs = await getNPCsWithCampaignsAction();

	return (
		<div>
			<UserDashboard user={user} campaigns={campaigns} npcs={npcs} />
		</div>
	);
}
