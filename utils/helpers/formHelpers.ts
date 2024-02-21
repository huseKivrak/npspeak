import {CampaignWithNPCs, NPCWithCampaigns} from '@/types/drizzle';
import {Tables} from '@/types/supabase';
export const transformCampaignOptions = (campaigns: CampaignWithNPCs[]) => {
	return campaigns.map((campaign) => ({
		value: campaign.campaign.id,
		label: campaign.campaign.campaign_name,
	}));
};

export const transformNPCOptions = (npcs: NPCWithCampaigns[]) => {
	return npcs.map((npc) => ({
		value: npc.npc.id,
		label: npc.npc.npc_name,
	}));
};

export const transformDialogueOptions = (
	dialogueTypes: Tables<'npc_dialogue_types'>[]
) => {
	return dialogueTypes.map((option) => ({
		value: option.id,
		label: option.type_name,
	}));
};
