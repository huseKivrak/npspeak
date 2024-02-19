import {npcs} from '@/database/drizzle/schema';
import {redirect} from 'next/navigation';
import NPCCard from '@/components/cards/NPCCard';
import {getUsername} from '@/actions/auth';

export default async function NPCDetailPage({
	params,
}: {
	params: {
		username: string;
		npcId: string;
	};
}) {
	const username = await getUsername();
	if (!username || username !== params.username) redirect('/');

	return <></>;
}
