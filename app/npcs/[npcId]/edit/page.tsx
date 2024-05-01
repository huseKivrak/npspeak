import {getAllElevenLabsVoices} from '@/actions/elevenLabs';
import {NPCForm} from '@/components/forms/NPCForm';
import {getNPCsWithRelatedData} from '@/database/drizzle/queries';
import {DetailedNPC, UpdateNPC} from '@/types/drizzle';

export default async function EditNPCPage({
	params,
}: {
	params: {
		npcId: number;
	};
}) {
	const voiceResponse = await getAllElevenLabsVoices();
	const voices = voiceResponse.status === 'success' ? voiceResponse.data : '';

	const npcResponse = await getNPCsWithRelatedData(params.npcId);
	const npc: DetailedNPC =
		npcResponse.status === 'success' ? npcResponse.data : '';
	const {id, npc_name, description, campaigns, voice_id} = npc;
	const campaignIds =
		campaigns.length > 0 ? campaigns.map((campaign) => campaign.id) : [];
	const editableNPC: UpdateNPC = {
		npc_id: id,
		npc_name,
		description: description ?? undefined,
		campaign_ids: campaignIds,
		voice_id: voice_id!,
	};

	return (
		<div>
			<NPCForm voiceOptions={voices} npcToUpdate={editableNPC} />
		</div>
	);
}
