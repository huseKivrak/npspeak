import UserDashboard from '../../components/UserDashboard';
import {getUserInfo} from '@/actions/auth';
import {
	getCampaignsWithNPCs,
	getNPCsWithRelatedData,
} from '../../database/drizzle/queries';
import {redirect} from 'next/navigation';

export default async function UserPage({
	searchParams,
}: {
	searchParams: {[key: string]: string | undefined};
}) {
	const {user} = await getUserInfo();
	if (!user) return redirect('/login');

	const campaigns = await getCampaignsWithNPCs();
	const npcs = await getNPCsWithRelatedData();

	return (
		<div>
			<UserDashboard user={user} campaigns={campaigns} npcs={npcs} />
		</div>
	);
}
