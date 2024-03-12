import {CampaignWithNPCs, DetailedNPC} from '@/types/drizzle';
import {Tables} from '@/types/supabase';
export const transformCampaignOptions = (campaigns: CampaignWithNPCs[]) => {
	return campaigns.map((campaign) => ({
		value: campaign.id,
		label: campaign.campaign_name,
	}));
};

export const transformNPCOptions = (npcs: DetailedNPC[]) => {
	return npcs.map((npc) => ({
		value: npc.id,
		label: npc.npc_name,
	}));
};

export const transformDialogueTypeOptions = (
	dialogueTypes: Tables<'npc_dialogue_types'>[]
) => {
	return dialogueTypes.map((option) => ({
		value: option.id,
		label: option.type_name,
	}));
};
