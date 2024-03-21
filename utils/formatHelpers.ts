import {DefaultDialogueOptions} from '@/lib/constants';
import {DetailedNPC, FormOptions} from '@/types/drizzle';
import {Tables} from '@/types/supabase';
import {ElevenLabsVoice} from '@/types/elevenlabs';

export const createStyledDialogue = (dialogue: Tables<'npc_dialogues'>) => {
	const style = dialogue.dialogue_type_id
		? DefaultDialogueOptions.find(
				(option) => option.value === dialogue.dialogue_type_id
		  )
		: null;

	const {id, text} = dialogue;
	const icon = style?.icon || null;
	const color = style?.color ? style.color : 'text-primary';

	return {
		id,
		text,
		icon,
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

export const createTTSFormOptions = (dialogues: Tables<'npc_dialogues'>[]) => {
	return dialogues.reduce<FormOptions>((acc, dialogue) => {
		if (!dialogue.tts_audio_id) {
			acc.push({label: dialogue.text, value: dialogue.id});
		}
		return acc;
	}, []);
};

const createStyledVoiceLabels = (voice: ElevenLabsVoice) => {
	const gender = voice.labels.gender;
	const age = voice.labels.age;
	const useCase = voice.labels.use_case;

	//todo: style these
	const accent = voice.labels.accent;
	const description = voice.labels.description;

	const genderColor = gender === 'male' ? 'text-blue-500' : 'text-pink-500';
	const ageColor =
		age === 'young'
			? 'text-green-200'
			: age === 'middle aged'
			? 'text-green-500'
			: 'text-green-800';

	return {
		useCase,
		genderColor,
		ageColor,
		accent,
		description,
	};
};

const getAllVoiceStyles = (voiceOptions: ElevenLabsVoice[]) => {
	const styledVoices: Record<
		string,
		ReturnType<typeof createStyledVoiceLabels>
	> = {};
	voiceOptions.forEach((v) => {
		styledVoices[v.voice_id] = createStyledVoiceLabels(v);
	});
	console.log('styledVoices', styledVoices);
	return styledVoices;
};
