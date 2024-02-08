import {Tables} from '@/types/supabase';

export default function NPCCarousel({NPCs}: {NPCs: Tables<'npcs'>[]}) {
	return (
		<>
			<div className='carousel w-full'>
				{NPCs.map((npc) => (
					<div
						id={`${npc.id}`}
						className='carousel-item w-full flex flex-col items-center '
					>
						<div className='bg-secondary p-2 rounded-2xl'>
							<h5 className='text-sm tracking-widest'>{npc.npc_name}</h5>
						</div>
						<p className='text-center mt-2'>{npc.description}</p>
					</div>
				))}
			</div>
			<div className='flex justify-center w-full py-2 gap-2'>
				{NPCs.map((npc, index) => (
					<a key={index} href={`#${npc.id}`} className='btn btn-xs'>
						{index + 1}
					</a>
				))}
			</div>
		</>
	);
}
