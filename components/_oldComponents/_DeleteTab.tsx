'use client';
import {DeleteModal} from './_DeleteModal';
import {deleteNPCAction} from '@/actions/db/NPCs';
import {PiSkullBold} from 'react-icons/pi';

export default function DeleteTab({npcId}: {npcId: number}) {
	return (
		<div className='card bg-base-200'>
			<div className='card-body items-center'>
				<h2 className='card-title'>
					<DeleteModal
						id={npcId}
						idName='npc_id'
						serverAction={deleteNPCAction}
						className='group btn btn-outline btn-error btn-lg hover:bg-error'
					>
						<PiSkullBold className='font-bold text-4xl text-error group-hover:text-white' />
					</DeleteModal>
				</h2>
			</div>
		</div>
	);
}
