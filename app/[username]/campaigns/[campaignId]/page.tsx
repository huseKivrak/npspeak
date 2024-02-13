import {getUsername} from '@/server-actions/auth';
import {redirect} from 'next/navigation';
import OpenScrollCard from '@/components/cards/OpenScrollCard';

export default async function CampaignDetailPage({
	params,
}: {
	params: {
		username: string;
		campaignId: number;
	};
}) {
	const username = await getUsername();
	if (!username || username !== params.username) redirect('/');

	return <></>;
}
