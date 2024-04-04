import {getUserInfo} from '@/actions/auth';
import {
	getCampaignsWithNPCs,
	getNPCsWithRelatedData,
} from '../../database/drizzle/queries';
import {redirect} from 'next/navigation';
import {UserDashboard} from '@/components/UserDashboard';

export default async function UserPage({
	searchParams,
}: {
	searchParams: {[key: string]: string | undefined};
}) {
	const {user} = await getUserInfo();
	if (!user) return redirect('/login');

	const campaigns = await getCampaignsWithNPCs();
	const npcs = await getNPCsWithRelatedData();

	return <UserDashboard campaigns={campaigns} npcs={npcs} />;
}
