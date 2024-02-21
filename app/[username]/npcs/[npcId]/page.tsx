import {redirect} from 'next/navigation';
import NPCCard from '@/components/cards/NPCCard';
import {getUsername} from '@/actions/auth';
import {getNPCsWithCampaigns} from '@/database/drizzle/queries';

export default async function NPCDetailPage({
	params,
}: {
	params: {
		username: string;
		npcId: number;
	};
}) {
	const username = getUsername();
	if (!username) return redirect('/login');

	const npcId = params.npcId;
	const NPCs = await getNPCsWithCampaigns();
	console.log('NPCs:', NPCs);
	const npc = NPCs?.find((npc) => npc.npc.id === npcId);

	return (
		<div>
			<h1>NPC Detail</h1>
			{npc ? <NPCCard npcData={npc} /> : <p>NPC not found</p>}
		</div>
	);
}
