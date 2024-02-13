import Link from 'next/link';
import {getUsername} from '@/server-actions/auth';
import {NPCsWithCampaigns} from '@/server-actions/drizzle';

export default async function NPCCard({npcData}: {npcData: NPCsWithCampaigns}) {
	const {npc, campaigns} = npcData;
	const username = await getUsername();
	return (
		<div className='card w-96 bg-base-100 shadow-xl'>
			<div className='card-body'>
				<h2 className='card-title'>{npc.npc_name}</h2>
				<p>{npc.description}</p>
				<div className='card-actions'>
					<ul>
						{campaigns &&
							campaigns.map((c) => (
								<li key={c.id}>
									<Link href={`/${username}/campaigns/${c.id}`}>
										{c.campaign_name}
									</Link>
								</li>
							))}
					</ul>
				</div>
			</div>
		</div>
	);
}
