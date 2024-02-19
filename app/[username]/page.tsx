import UserDashboard from '@/components/UserDashboard';
import {getUserFromSession} from '@/actions/auth';
import {redirect} from 'next/navigation';
import {
	getCampaignsAndNPCs,
	getNPCsWithCampaignsAction,
} from '@/database/drizzle/queries';

export default async function UserPage({params}: {params: {username: string}}) {
	const user = await getUserFromSession();
	if (!user) redirect('/login');

	const sessionUsername = user?.user_metadata.username;
	if (sessionUsername.toLowerCase() !== params.username.toLowerCase())
		redirect('/login');

	const campaigns = await getCampaignsAndNPCs();
	const npcs = await getNPCsWithCampaignsAction();

	return (
		<div>
			<UserDashboard user={user} campaigns={campaigns} npcs={npcs} />
		</div>
	);
}
