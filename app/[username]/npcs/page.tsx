import {getNPCsWithRelatedData} from '@/database/drizzle/queries';
import NPCTabListCard from '@/components/cards/NPCTabListCard';
import {createAllTabData} from '@/actions/npcTabData';

export default async function NPCsPage({params}: {params: {username: string}}) {
	const npcs = await getNPCsWithRelatedData();
	const username = params.username;
	if (!npcs) return <p>no npcs!</p>;

	const totalNPCTabData = await Promise.all(
		npcs.map(async (n) => {
			const tabData = await createAllTabData(n);
			return {npc: n, tabData};
		})
	);
	return (
		<div>
			<h1>{username}&apos;s npcs</h1>
			<ul>
				{totalNPCTabData &&
					totalNPCTabData.map((n) => (
						<li key={n.npc.id}>
							<NPCTabListCard npc={n.npc} allTabData={n.tabData} />
						</li>
					))}
			</ul>
		</div>
	);
}
