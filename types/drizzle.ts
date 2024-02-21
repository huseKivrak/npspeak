import {Tables} from './supabase';

type RawJoinData = {
	campaigns: Tables<'campaigns'>;
	npcs: Tables<'npcs'>;
	campaign_npcs: Tables<'campaign_npcs'>;
};

export type CampaignWithNPCs = {
	campaign: RawJoinData['campaigns'];
	npcs: RawJoinData['npcs'][];
};

export type NPCWithCampaigns = {
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

export type FormOptions =
	| {
			value: number;
			label: string;
	  }[]
	| [];
