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
			<img
				src={`/images/scrolls${
					showNPCs ? '/open_scroll_no_bg.png' : '/closed_scroll_no_bg.png'
				}`}
				alt='scroll'
				className='absolute inset-0 w-full h-full object-cover'
			/>

			<div className='relative z-10 p-4'>
				<h2 className='text-2xl font-bold text-gray-800 mt-8 px-16'>
					{campaign.campaign_name}
				</h2>
				{campaign.description && (
					<p className='text-stone-100 p-10'>{campaign.description}</p>
				)}
				<div className='flex justify-center'>
					<button
						className='btn btn-sm text-white btn-ghost mb-8'
						onClick={() => setShowNPCs(!showNPCs)}
					>
						NPCs
					</button>
				</div>
				{showNPCs && NPCs && <NPCCarousel NPCs={NPCs} />}
			</div>
		</div>
	);
}
