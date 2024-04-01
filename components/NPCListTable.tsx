'use client';

import {DetailedNPC} from '@/types/drizzle';
import Link from 'next/link';
import {PiSkullBold} from 'react-icons/pi';
import {DeleteModal} from './forms/DeleteModal';
import {deleteNPCAction} from '@/actions/db/NPCs';

export default function NPCListTable({npcs}: {npcs: DetailedNPC[]}) {
	console.log('npcs:', npcs);
	return (
		<div className='overflow-x-auto'>
			<div className='flex justify-start items-center'>
				<h2 className='text-2xl font-bold'>NPCs</h2>
				<Link href={`/npcs/create`} className='btn btn-accent btn-xs ml-4'>
					+ Create NPC
				</Link>
			</div>
			<table className='table'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Campaigns</th>
						<th>Dialogue Count</th>
						<th>Created</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{npcs.map((npc) => (
						<tr key={npc.id} className='hover'>
							<td className='text-primary link-hover font-bold'>
								<Link href={`/npcs/${npc.id}`}>{npc.npc_name}</Link>
							</td>
							<td>{npc.description}</td>
							<td className='flex flex-col gap-2 text-secondary link-hover font-medium'>
								<ul>
									{npc.campaigns.map((campaign) => (
										<li key={campaign.id}>
											<Link href={`/campaigns/${campaign.id}`}>
												{campaign.campaign_name}
											</Link>
										</li>
									))}
								</ul>
							</td>
							<td>{npc.dialogues.length}</td>
							<td>{npc.created_at.toString()}</td>
							<td>
								<DeleteModal
									id={npc.id}
									idName='npc_id'
									serverAction={deleteNPCAction}
									className='group btn btn-outline btn-error btn-xs hover:bg-error'
								>
									<div className='tooltip tooltip-error' data-tip='delete'>
										<PiSkullBold className='font-bold text-lg text-error group-hover:text-white' />
									</div>
								</DeleteModal>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
