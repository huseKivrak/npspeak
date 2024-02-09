'use client';
import {Tables} from '@/types/supabase';
import {useState} from 'react';
import NPCCarousel from '../NPCCarousel';

//todo
import Link from 'next/link';

export default function OpenScrollCard({
	campaign,
	NPCs,
}: {
	campaign: Tables<'campaigns'>;
	NPCs?: Tables<'npcs'>[] | null;
}) {
	const [showNPCs, setShowNPCs] = useState(false);

	return (
		<div className='relative w-80 bg-transparent'>
			<img
				src={`/images/scrolls${
					showNPCs ? '/open_scroll_no_bg.png' : '/closed_scroll_no_bg.png'
				}`}
				alt='Scroll'
				className='absolute inset-0 w-full h-full object-cover'
				style={{filter: 'brightness(0.6)'}}
			/>

			<div className='relative z-10 text-center'>
				<h2 className='mt-2 text-xl text-transparent bg-clip-text bg-gradient-to-br from-yellow-50 via-yellow-500 to-yellow-100 font-extralight hover:underline'>
					{campaign.campaign_name}
				</h2>
				{showNPCs ? (
					<p className='text-stone-100 p-10'>{campaign.description}</p>
				) : (
					<button
						className='btn btn-xs text-white btn-ghost'
						onClick={() => setShowNPCs(!showNPCs)}
					>
						NPCs
					</button>
				)}
				{showNPCs && NPCs && <NPCCarousel NPCs={NPCs} />}
			</div>
		</div>
	);
}
