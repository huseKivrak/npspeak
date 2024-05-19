import {
	DetailedDialogue,
	DetailedNPC,
	FormOptions,
	SoundboardDialogue,
} from '@/types/drizzle';
import {Tables} from '@/types/supabase';

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

export const createTTSFormOptions = (dialogues: Tables<'npc_dialogues'>[]) => {
	return dialogues.reduce<FormOptions>((acc, dialogue) => {
		if (!dialogue.tts_audio_id) {
			acc.push({label: dialogue.text, value: dialogue.id});
		}
		return acc;
	}, []);
};

export const formatDialoguesForSoundboard = (
	dialogues: DetailedDialogue[]
): SoundboardDialogue[] => {
	const formattedDialogues = dialogues.map((dialogue) => ({
		id: dialogue.id,
		type: dialogue.dialogueType || 'other',
		text: dialogue.text,
		audio: dialogue.audioURL || '',
		npc_id: dialogue.npc_id!,
	}));

	return formattedDialogues;
};

export const formatTimer = (time: number) => {
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60);
	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
