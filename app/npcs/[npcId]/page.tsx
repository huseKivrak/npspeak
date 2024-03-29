import {redirect} from 'next/navigation';
import NPCTabListCard from '@/components/cards/NPCTabListCard';
import {getUserInfo} from '@/actions/auth';
import {getNPCById} from '@/database/drizzle/queries';
import {createAllTabData} from '@/actions/npcTabData';
import NPCDialogueTable from '@/components/NPCDialogueTable';
export default async function NPCDetailPage({
	params,
}: {
	params: {
		npcId: number;
	};
}) {
	const {user} = await getUserInfo();
	if (!user) return redirect('/login');

	const npc = await getNPCById(params.npcId);
	if (!npc) return redirect('/404');
	if (npc.user_id !== user.id) return <p>Unauthorized</p>;

	const allTabData = await createAllTabData(npc);
	// return <NPCTabListCard npc={npc} allTabData={allTabData} />;
	return <NPCDialogueTable npc={npc} />;
}
