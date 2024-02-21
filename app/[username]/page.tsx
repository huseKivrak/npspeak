import UserDashboard from '@/components/UserDashboard';
import {getUserFromSession} from '@/actions/auth';
import {redirect} from 'next/navigation';
import {
	getCampaignsWithNPCs,
	getNPCsWithCampaigns,
} from '@/database/drizzle/queries';

export default async function UserPage({params}: {params: {username: string}}) {
	const user = await getUserFromSession();
	if (!user) redirect('/login');

	const sessionUsername = user?.user_metadata.username;
	if (sessionUsername.toLowerCase() !== params.username.toLowerCase())
		redirect('/login');

	const campaigns = await getCampaignsWithNPCs();
	const npcs = await getNPCsWithCampaigns();

	return (
		<div>
			<UserDashboard user={user} campaigns={campaigns} npcs={npcs} />
		</div>
	);
}
