import {DetailedNPC} from '@/types/drizzle';
import {getAudioURLsforNPCDialogues} from '@/database/drizzle/queries';
import {getPresignedDownloadURL} from '@/actions/s3';

export default async function DialogueTabCard({npc}: {npc: DetailedNPC}) {
	if (!npc.user_id) return null;

	const audioURLs = await getAudioURLsforNPCDialogues(npc.id, npc.user_id);

	const presignedAudioURLs = await Promise.all(
		audioURLs.map(async (d) => {
			try {
				const dialogueId = d.id;
				const {status, message} = await getPresignedDownloadURL(d.audioURL!);
				console.log(
					`Got presigned URL for dialogue ${dialogueId}:`,
					`PRESIGNED URL: ${message}`
				);
				return {dialogueId, url: message};
			} catch (error) {
				console.error(error);
				return {dialogueId: d.id, url: null};
			}
		})
	);
	const audioForDialogue = (dialogueId: number) =>
		presignedAudioURLs.find((a) => a.dialogueId === dialogueId)?.url;

	return (
		<div className='card bg-base-200'>
			<div className='card-body'>
				<h2 className='card-title'>{npc.npc_name}'s dialogue</h2>
				<ul>
					{npc.dialogues.map((d) => (
						<li key={d.id}>
							{d.text}
							{audioForDialogue(d.id) && (
								<audio src={audioForDialogue(d.id)!} controls />
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
