import {getNPCsWithRelatedData} from '@/database/drizzle/queries';
import {createAllTabData} from '@/actions/npcTabData';
import NPCListTable from '@/components/NPCListTable';

export default async function NPCsPage() {
	const npcs = await getNPCsWithRelatedData();
	if (!npcs) return <p>no npcs!</p>;

	return (
		<div>
			<NPCListTable npcs={npcs} />
		</div>
	);
}
