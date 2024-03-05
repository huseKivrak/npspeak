'use client';
import {DetailedNPC} from '@/types/drizzle';
import {useState} from 'react';
import {useParams} from 'next/navigation';
import Link from 'next/link';
import DeleteNPCModal from '../DeleteNPCModal';
import {cn} from '@/utils/helpers/clsxMerge';
import {PiSkullBold} from 'react-icons/pi';

export default function NPCTabCard({npc}: {npc: DetailedNPC}) {
	const [tab, setTab] = useState(1);
	const username = useParams().username;

	return (
		<div role='tablist' className='tabs tabs-lifted'>
			<input
				type='radio'
				name='npc_tabs'
				role='tab'
				className='tab bg-primary'
				aria-label='overview'
				checked={tab === 1}
				onClick={() => setTab(1)}
			/>
			<div role='tabpanel' className='tab-content bg-primary rounded-box p-6'>
				<div className='card'>
					<div className='card-body'>
						<h2 className='card-title text-primary-content'>{npc.npc_name}</h2>
						<p>{npc.description}</p>
					</div>
				</div>
			</div>
			<input
				type='radio'
				name='npc_tabs'
				role='tab'
				className={cn('tab', tab === 2 ? 'bg-info text-white' : 'bg-info')}
				aria-label='dialogue'
				onClick={() => setTab(2)}
			/>
			<div role='tabpanel' className='tab-content bg-info rounded-box p-6'>
				<div className='card'>
					<div className='card-body'>
						<h2 className='card-title text-info-content'>
							{npc.npc_name}'s dialogue
						</h2>
						<ul>
							{npc.dialogues &&
								npc.dialogues.map((d) => <li key={d.dialogue_id}>{d.text}</li>)}
						</ul>
					</div>
				</div>
			</div>
			<input
				type='radio'
				name='npc_tabs'
				role='tab'
				className={cn('tab', {
					'bg-secondary': tab !== 3,
					'bg-primary': tab === 3,
				})}
				aria-label='campaigns'
				checked={tab === 3}
				onClick={() => setTab(3)}
			/>
			<div role='tabpanel' className='tab-content bg-secondary rounded-box p-6'>
				<div className='card'>
					<div className='card-body'>
						<h2 className='card-title text-secondary-content'>
							{npc.npc_name}'s campaigns
						</h2>
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
				className='tab bg-error'
				aria-label='delete'
				onClick={() => setTab(4)}
			/>
			<div role='tabpanel' className='tab-content bg-base-300 rounded-box p-6'>
				<div className='card'>
					<div className='card-body items-center'>
						<h2 className='card-title'>
							<DeleteNPCModal
								id={npc.id}
								className='btn btn-outline btn-error btn-lg hover:bg-error hover:text-white'
							>
								<PiSkullBold className='font-bold text-4xl text-error hover:text-white' />
							</DeleteNPCModal>
						</h2>
					</div>
				</div>
			</div>
		</div>
	);
}
