'use client';

import Link from 'next/link';
import {getUserInfo} from '@/actions/auth';
import {DetailedNPC} from '@/types/drizzle';
import DeleteNPCModal from '../DeleteNPCModal';
import DialogueForm from '../forms/DialogueForm';

export default async function NPCCard({npc}: {npc: DetailedNPC}) {
	return (
		<div className='card w-96 bg-base-100 shadow-xl'>
			<div className='card-body'>
				<h2 className='card-title'>{npc.npc_name}</h2>
				<p>{npc.description}</p>
				<div className='card-actions'>
					<ul className='flex flex-col gap-3'>
						{npc.campaigns &&
							npc.campaigns.map((c) => (
								<li key={c.id} className='badge badge-primary'>
									{c.campaign_name}
								</li>
							))}
					</ul>
				</div>
				<div className='mt-8'>
					<DeleteNPCModal id={npc.id} />
				</div>
			</div>
		</div>
	);
}
