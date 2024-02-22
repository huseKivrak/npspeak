import UserDashboard from '@/components/UserDashboard';
import {getUserInfo} from '@/actions/auth';
import {redirect} from 'next/navigation';
import {
	getCampaignsWithNPCs,
	getNPCsWithRelatedData,
} from '@/database/drizzle/queries';

export default async function UserPage({params}: {params: {username: string}}) {
	const {user} = await getUserInfo();
	if (!user) redirect('/login');

	const sessionUsername = user.username;
	if (sessionUsername.toLowerCase() !== params.username.toLowerCase())
		redirect('/login');

	const campaigns = await getCampaignsWithNPCs();
	const npcs = await getNPCsWithRelatedData();

	return (
		<div>
			<UserDashboard user={user} campaigns={campaigns} npcs={npcs} />
		</div>
	);
}
