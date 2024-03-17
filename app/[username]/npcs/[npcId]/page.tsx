import {redirect} from 'next/navigation';
import {getUserInfo} from '@/actions/auth';
import {getNPCById} from '@/database/drizzle/queries';
import NPCTabCard from '@/components/cards/NPCTabCard';

export default async function NPCDetailPage({
	params,
}: {
	params: {
		username: string;
		npcId: number;
	};
}) {
	const {user} = await getUserInfo();
	if (!user) return redirect('/login');

	const npc = await getNPCById(params.npcId);
	console.log('NPC!: ', npc);
	if (!npc) return redirect('/404');
	if (npc.user_id !== user.id) return <p>Unauthorized</p>;

	return (
		<div>
			<NPCTabCard npc={npc} />
		</div>
	);
}
