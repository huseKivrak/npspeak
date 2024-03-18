import {IconType} from 'react-icons';
import {Tables} from './supabase';

export type CampaignWithNPCs = Tables<'campaigns'> & {
	npcs: Tables<'npcs'>[];
};

export type DetailedNPC = Tables<'npcs'> & {
	campaigns: Tables<'campaigns'>[];
	dialogues: Tables<'npc_dialogues'>[];
};

export type ActionStatus =
	| {
			status: 'success';
			message: string;
			data: any;
	  }
	| {
			status: 'error';
			message: string;
			errors?: Array<{
				path: string;
				message: string;
			}>;
	  }
	| {
			status: 'idle';
			message: '';
	  };

export type FormOptions =
	| {
			value: number;
			label: string;
	  }[];

export type DefaultDialogueStyles = {
	label: string;
	value: number;
	iconName: string;
	color: string;
};

export type StyledDialogueWithAudioURL = {
	id: number;
	text: string;
	audioURL: string | null;
	color: string;
	iconName: string | null;
};
