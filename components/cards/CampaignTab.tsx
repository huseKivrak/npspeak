'use client';

import {DetailedNPC} from '@/types/drizzle';
import Link from 'next/link';
import {useParams} from 'next/navigation';

//todo: adding/removing campaigns to npc

export default function CampaignTab({npc}: {npc: DetailedNPC}) {
	const {username} = useParams();
	return (
		<div className='card bg-base-200'>
			<div className='card-body'>
				<h2 className='card-title'>campaigns with {npc.npc_name}</h2>
				{npc.campaigns.length > 0 ? (
					npc.campaigns.map((c) => (
						<Link
							key={c.id}
							href={`/${username}/campaigns/${c.id}`}
							className='hover:underline hover:font-bold'
						>
							{c.campaign_name}
						</Link>
					))
				) : (
					<p>{npc.npc_name} is not in any campaigns</p>
				)}
			</div>
		</div>
	);
}
