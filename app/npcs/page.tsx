import {getNPCsWithRelatedData} from '@/database/drizzle/queries';
import {NPCListTable} from '@/components/tables/NPCListTable';

export default async function NPCsPage() {
	const npcResponse = await getNPCsWithRelatedData();
	const npcs = npcResponse.status === 'success' ? npcResponse.data : [];

	return (
		<div>
			<NPCListTable npcs={npcs} />
		</div>
	);
}
