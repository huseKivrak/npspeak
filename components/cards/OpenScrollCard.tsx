'use client';
import {Tables} from '@/types/supabase';
import {useState} from 'react';
import NPCCarousel from '../NPCCarousel';

export default function OpenScrollCard({
	campaign,
	NPCs,
}: {
	campaign: Tables<'campaigns'>;
	NPCs?: Tables<'npcs'>[] | null;
}) {
	const [showNPCs, setShowNPCs] = useState(false);

	return (
		<div className='relative w-96 bg-transparent'>
			{showNPCs ? (
				<img
					src='/images/scrolls/open_scroll_no_bg.png'
					alt='scroll'
					className='absolute inset-0 w-full h-full object-cover'
				/>
			) : (
				<img
					src='/images/scrolls/closed_scroll_no_bg.png'
					alt='scroll'
					className='absolute inset-0 w-full h-full object-cover'
				/>
			)}
			<div className='relative z-10 p-4 left-0.5 translate-x-48'>
				<h2 className='text-2xl font-bold text-gray-800 mt-8 px-8'>
					{campaign.campaign_name}
				</h2>
				{campaign.description && (
					<p className='text-stone-600 p-8'>{campaign.description}</p>
				)}
				<button
					className='mt-4 btn text-white btn-ghost'
					onClick={() => setShowNPCs(!showNPCs)}
				>
					See NPCs
				</button>
				{showNPCs && NPCs && <NPCCarousel NPCs={NPCs} />}
			</div>
		</div>
	);
}
