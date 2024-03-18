import {Tables} from '@/types/supabase';
import TTSForm from '../forms/TTSForm';
import {FormOptions} from '@/types/drizzle';
export default function TTSTab({
	npcDialogue,
}: {
	npcDialogue: Tables<'npc_dialogues'>[];
}) {
	const npcId = npcDialogue[0].npc_id!;

	/** Filters for npc dialogue without audio and formats for form selection
	 */
	const ttsFormOptions = npcDialogue.reduce<FormOptions>((acc, dialogue) => {
		if (!dialogue.tts_audio_id) {
			acc.push({label: dialogue.text, value: dialogue.id});
		}
		return acc;
	}, []);

	return (
		<div className='card bg-base-200'>
			<div className='card-body items-center'>
				<h2 className='card-title'>TTS</h2>
				<TTSForm npcDialogueChoices={ttsFormOptions} npc_id={npcId} />
			</div>
		</div>
	);
}
