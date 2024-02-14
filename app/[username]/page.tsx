import UserDashboard from '@/components/UserDashboard';
import {getUserFromSession, getUsername} from '@/server-actions/auth';
import {redirect} from 'next/navigation';
import {getCampaignsAndNPCs, getNPCsAction} from '@/server-actions/drizzle';
import CampaignForm from '@/components/forms/CampaignForm';
import Link from 'next/link';

export default async function UserPage({params}: {params: {username: string}}) {
	const user = await getUserFromSession();
	if (!user) redirect('/login');

	const sessionUsername = user?.user_metadata.username;
	if (sessionUsername.toLowerCase() !== params.username.toLowerCase())
		redirect('/login');

	const campaigns = await getCampaignsAndNPCs();
	const npcs = await getNPCsAction();

	return (
		<div>
			<UserDashboard user={user} campaigns={campaigns} npcs={npcs} />
		</div>
	);
}
