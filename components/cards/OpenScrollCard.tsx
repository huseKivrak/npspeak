'use client';

import {useState} from 'react';
import NPCCarousel from './NPCCarousel';
import DeleteCampaignModal from '../DeleteCampaignModal';
import {CampaignsWithNPCs} from '@/server-actions/drizzle';
import Image from 'next/image';

//todo
import Link from 'next/link';

export default function OpenScrollCard({
	campaignData,
}: {
	campaignData: CampaignsWithNPCs;
}) {
	const [showNPCs, setShowNPCs] = useState(false);
	const {campaign, npcs} = campaignData;

	return (
		<div className='relative w-full bg-transparent m-12'>
			<Image
				src={`/images/scrolls${
					showNPCs ? '/open_scroll_no_bg.png' : '/closed_scroll_no_bg.png'
				}`}
				alt='Scroll'
				className='absolute inset-0 w-full h-full object-cover'
				style={{filter: 'brightness(0.6)'}}
				layout='fill'
			/>

			<div className='relative z-10 text-center'>
				<h2 className=' text-xl text-transparent bg-clip-text bg-gradient-to-br from-yellow-50 via-yellow-500 to-yellow-100 font-extralight hover:underline'>
					{campaign.campaign_name}
				</h2>
				{showNPCs ? (
					<>
						<p className='text-balance text-stone-100 text-sm p-10 text-center'>
							{campaign.description}
						</p>
						<DeleteCampaignModal id={campaign.id} />
					</>
				) : (
					<button
						className='btn btn-xs px-0 text-white btn-ghost'
						onClick={() => setShowNPCs(!showNPCs)}
					>
						NPCs
					</button>
				)}
				{showNPCs && npcs && <NPCCarousel NPCs={npcs} />}
				{/* {showNPCs && NPCs && <Responsive NPCs={NPCs} />} */}
			</div>
		</div>
	);
}
