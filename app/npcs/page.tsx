import {getNPCsWithRelatedData} from '@/database/drizzle/queries';
import {createAllTabData} from '@/actions/npcTabData';
import NPCListTable from '@/components/NPCListTable';

export default async function NPCsPage() {
	const npcs = await getNPCsWithRelatedData();
	if (!npcs) return <p>no npcs!</p>;

	const totalNPCTabData = await Promise.all(
		npcs.map(async (n) => {
			const tabData = await createAllTabData(n);
			return {npc: n, tabData};
		})
	);
	return (
		<div>
			<h1>NPCs</h1>
			{/* <ul>
				{totalNPCTabData &&
					totalNPCTabData.map((n) => (
						<li key={n.npc.id}>
							<NPCTabListCard npc={n.npc} allTabData={n.tabData} />
						</li>
					))}
			</ul> */}
			<NPCListTable npcs={npcs} />
		</div>
	);
}
