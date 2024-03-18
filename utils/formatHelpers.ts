import {DefaultDialogueOptions} from '@/lib/constants';
import {DetailedNPC} from '@/types/drizzle';
import {Tables} from '@/types/supabase';

export const createStyledDialogue = (dialogue: Tables<'npc_dialogues'>) => {
	const style = dialogue.dialogue_type_id
		? DefaultDialogueOptions.find(
				(option) => option.value === dialogue.dialogue_type_id
		  )
		: null;

	const {id, text} = dialogue;
	const iconName = style?.iconName || null;
	const color = style?.color ? style.color : 'text-primary';

	return {
		id,
		text,
		iconName,
		color,
	};
};

export const createNPCStats = (npc: DetailedNPC) => {
	const dialogueCount = npc.dialogues.length;
	const dialogueWithAudioCount = npc.dialogues.filter(
		(d) => d.tts_audio_id
	).length;
	const dialogueAudioPercentage = `${(
		(dialogueWithAudioCount / dialogueCount) *
		100
	).toFixed(2)} %`;
	const campaignCount = npc.campaigns.length;

	return {
		dialogueCount,
		campaignCount,
		dialogueWithAudioCount,
		dialogueAudioPercentage,
	};
};
