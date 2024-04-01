import {getNPCDialogueTabData} from '@/actions/npcTabData';
import {DetailedDialogue, DetailedNPC} from '@/types/drizzle';
import AddDialogueToNPC from './cards/AddDialogueToNPC';
import Link from 'next/link';
import {DialogueIcon} from './icons/DialogueIcon';
import AddTTSModal from './forms/AddTTSModal';
import {
	PiSkullBold,
	PiMicrophoneBold,
	PiMicrophoneSlashBold,
} from 'react-icons/pi';
import {DeleteModal} from './forms/DeleteModal';
import {deleteDialogueAction} from '@/actions/db/dialogue';

export default async function NPCDialogueTable({npc}: {npc: DetailedNPC}) {
	const dialogueData = await getNPCDialogueTabData(npc);
	const detailedDialogues =
		dialogueData.status === 'success' ? dialogueData.data : [];
	return (
		<div className=''>
			<h1 className='text-3xl font-bold text-accent tracking-wide'>
				{npc.npc_name}
			</h1>
			<p className='text-lg font-light text-primary'>{npc.description}</p>
			<div className='divider' />
			<h2 className='text-lg font-bold text-primary'>Campaigns:</h2>
			{npc.campaigns && npc.campaigns.length > 0 ? (
				<div className='flex flex-col gap-2'>
					<ul>
						{npc.campaigns.map((campaign) => (
							<li key={campaign.id}>
								<Link
									href={`/campaigns/${campaign.id}`}
									className='text-secondary'
								>
									{campaign.campaign_name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			) : (
				<p>No campaigns</p>
			)}
			<div className='divider' />

			<div className='flex justify-start'>
				<h2 className='mt-4 text-2xl font-bold text-primary mr-4'>Dialogue</h2>
				<AddDialogueToNPC npcId={npc.id} />
			</div>
			<div className='overflow-x-auto'>
				<table className='table-auto'>
					<thead>
						<tr>
							<th>Type</th>
							<th>Text</th>
							<th>Audio</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{detailedDialogues.map((dialogue: DetailedDialogue) => {
							return (
								<tr key={dialogue.id}>
									<td>
										<div className='tooltip' data-tip={dialogue.dialogueType}>
											<DialogueIcon dialogueType={dialogue.dialogueType} />
										</div>
									</td>
									<td>{dialogue.text}</td>
									<td>
										{dialogue.audioURL ? (
											<audio src={dialogue.audioURL} controls />
										) : (
											<PiMicrophoneSlashBold />
										)}
									</td>
									<td>
										<div className='flex gap-2'>
											<DeleteModal
												id={dialogue.id}
												idName='dialogue_id'
												serverAction={deleteDialogueAction}
												className='group btn btn-outline btn-error btn-xs hover:bg-error'
											>
												<PiSkullBold className='font-bold text-lg text-error group-hover:text-white' />
											</DeleteModal>
											{npc.voice_id && dialogue.audioURL === null && (
												<AddTTSModal
													dialogue={dialogue}
													voiceId={npc.voice_id}
													npcId={npc.id}
												>
													<PiMicrophoneBold className='font-bold text-lg text-primary group-hover:text-white' />
												</AddTTSModal>
											)}
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
