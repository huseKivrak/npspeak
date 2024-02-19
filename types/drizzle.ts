import {Tables} from './supabase';

type RawJoinData = {
	campaigns: Tables<'campaigns'>;
	npcs: Tables<'npcs'>;
	campaign_npcs: Tables<'campaign_npcs'>;
};

export type CampaignsWithNPCs = {
	campaign: RawJoinData['campaigns'];
	npcs: RawJoinData['npcs'][];
};

export type NPCsWithCampaigns = {
	npc: RawJoinData['npcs'];
	campaigns: RawJoinData['campaigns'][];
};

export type State =
	| {
			status: 'success';
			message: string;
	  }
	| {
			status: 'error';
			message: string;
			errors?: Array<{
				path: string;
				message: string;
			}>;
	  }
	| null;
