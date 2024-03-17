import {DetailedNPC} from '@/types/drizzle';
import {getAudioURLsforNPCDialogues} from '@/database/drizzle/queries';
import {getPresignedDownloadURL} from '@/actions/s3';
import {DefaultDialogueOptions} from '@/lib/constants';
import {FaMicrophone} from 'react-icons/fa';
import {Tables} from '@/types/supabase';

export default async function DialogueTabCard({npc}: {npc: DetailedNPC}) {
	if (!npc.user_id) return null;

	const audioURLs = await getAudioURLsforNPCDialogues(npc.id, npc.user_id);

	const presignedAudioURLs = await Promise.all(
		audioURLs.map(async (d) => {
			try {
				const {status, message} = await getPresignedDownloadURL(d.audioURL!);
				console.log(
					`Got presigned URL for dialogue ${d.id}:`,
					`PRESIGNED URL: ${message}`
				);
				if (status === 'error') return {id: d.id, url: null};

				return {id: d.id, url: message};
			} catch (error) {
				console.error(error);
				return {id: d.id, url: null};
			}
		})
	);

	const audioForDialogue = (dialogueId: number) =>
		presignedAudioURLs.find((a) => a.id === dialogueId)?.url;

	const styleForDialogue = (dialogueTypeId: number) => {
		const style = DefaultDialogueOptions.find(
			(option) => option.value === dialogueTypeId
		);
		return style;
	};
	const createDetailedDialogue = (dialogue: Tables<'npc_dialogues'>) => {
		const style = dialogue.dialogue_type_id
			? styleForDialogue(dialogue.dialogue_type_id)
			: undefined;
		console.log('dialogue style:', style);
		const dialogueAudio = audioForDialogue(dialogue.id);
		const IconComponent = style?.Icon ? style.Icon : FaMicrophone;
		const color = style?.color ? style.color : 'text-primary';
		return {
			id: dialogue.id,
			text: dialogue.text,
			Icon: IconComponent,
			color: color,
			audio: dialogueAudio,
		};
	};

	const detailedDialogues = npc.dialogues.map((d) => createDetailedDialogue(d));

	return (
		<div className='card bg-base-200'>
			<div className='card-body'>
				<h2 className='card-title'>{npc.npc_name}'s dialogue</h2>
				<ul>
					{detailedDialogues.map((d) => {
						return (
							<li key={d.id}>
								<d.Icon className={`text-2xl ${d.color}`} />
								<p>{d.text}</p>
								{d.audio && <audio src={d.audio} controls />}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
