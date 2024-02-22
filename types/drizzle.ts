import {Tables} from './supabase';

type RawJoinData = {
	campaigns: Tables<'campaigns'>;
	npcs: Tables<'npcs'>;
	campaign_npcs: Tables<'campaign_npcs'>;
};

export type CampaignWithNPCs = Tables<'campaigns'> & {
	npcs: Tables<'npcs'>[];
};

export type DetailedNPC = Tables<'npcs'> & {
	campaigns: Tables<'campaigns'>[];
	dialogues: Tables<'npc_dialogues'>[];
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
