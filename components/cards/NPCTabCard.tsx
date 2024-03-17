'use client';
import {DetailedNPC} from '@/types/drizzle';
import {useState} from 'react';
import {useParams} from 'next/navigation';
import Link from 'next/link';
import DeleteNPCModal from '../DeleteNPCModal';
import {cn} from '@/utils/helpers/clsxMerge';
import {PiSkullBold} from 'react-icons/pi';
import TTSForm from '../forms/TTSForm';
import DialogueForm from '../forms/DialogueForm';

export default function NPCTabCard({
	npc,
	children,
}: {
	npc: DetailedNPC;
	children: React.ReactNode;
}) {
	const [tab, setTab] = useState(1);
	const [showDialogueForm, setShowDialogueForm] = useState(false);
	const {username} = useParams();

	// get all dialogues that don't have audio
	const TTSdialogueOptions = npc.dialogues
		.filter((d) => !d.tts_audio_id)
		.map((d) => {
			return {label: d.text, value: d.id};
		});

	return (
		<div className='flex justify-center items-center'>
			<div role='tablist' className='tabs tabs-boxed tabs-lg rounded-box'>
				<input
					type='radio'
					name='npc_tabs'
					role='tab'
					className={cn('tab', tab === 1 ? 'tab-active' : 'bg-base-300')}
					aria-label='overview'
					onClick={() => setTab(1)}
				/>
				<div role='tabpanel' className='tab-content rounded-box p-6'>
					<div className='card bg-base-200'>
						<div className='card-body'>
							<h2 className='card-title'>{npc.npc_name}</h2>
							<p>{npc.description}</p>
						</div>
					</div>
				</div>

				<input
					type='radio'
					name='npc_tabs'
					role='tab'
					className={cn('tab', tab === 2 ? 'tab-active' : 'bg-base-300')}
					aria-label='dialogue'
					onClick={() => setTab(2)}
				/>
				<div role='tabpanel' className='tab-content rounded-box p-6'>
					{children}
					<button
						className={cn('btn btn-outline btn-sm max-w-fit mt-4', {
							'btn-primary': !showDialogueForm,
							'btn-error': showDialogueForm,
						})}
						onClick={() => setShowDialogueForm(!showDialogueForm)}
					>
						{showDialogueForm ? 'cancel' : 'add'}
					</button>
					{showDialogueForm && <DialogueForm npcId={npc.id} />}
				</div>

				<input
					type='radio'
					name='npc_tabs'
					role='tab'
					className={cn('tab', tab === 3 ? 'tab-active ' : 'bg-base-300')}
					aria-label='campaigns'
					onClick={() => setTab(3)}
				/>
				<div role='tabpanel' className='tab-content rounded-box p-6'>
					<div className='card bg-base-200'>
						<div className='card-body'>
							<h2 className='card-title'>{npc.npc_name}'s campaigns</h2>
							{npc.campaigns &&
								npc.campaigns.map((c) => (
									<Link
										key={c.id}
										href={`/${username}/campaigns/${c.id}`}
										className='hover:underline hover:font-bold'
									>
										{c.campaign_name}
									</Link>
								))}
						</div>
					</div>
				</div>

				<input
					type='radio'
					name='npc_tabs'
					role='tab'
					className={cn('tab', tab === 4 ? 'tab-active' : 'bg-base-300')}
					aria-label='delete'
					onClick={() => setTab(4)}
				/>
				<div role='tabpanel' className='tab-content rounded-box p-6'>
					<div className='card bg-base-200'>
						<div className='card-body items-center'>
							<h2 className='card-title'>
								<DeleteNPCModal
									id={npc.id}
									className='group btn btn-outline btn-error btn-lg hover:bg-error'
								>
									<PiSkullBold className='font-bold text-4xl text-error group-hover:text-white' />
								</DeleteNPCModal>
							</h2>
						</div>
					</div>
				</div>
				<input
					type='radio'
					name='npc_tabs'
					role='tab'
					className={cn('tab', tab === 5 ? 'tab-active' : 'bg-base-300')}
					aria-label='tts'
					onClick={() => setTab(5)}
				/>
				<div role='tabpanel' className='tab-content rounded-box p-6'>
					<div className='card bg-base-200'>
						<div className='card-body items-center'>
							<h2 className='card-title'>TTS</h2>
							<TTSForm
								npcDialogueChoices={TTSdialogueOptions}
								npc_id={npc.id}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
