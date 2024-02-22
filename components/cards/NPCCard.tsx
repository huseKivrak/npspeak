import Link from 'next/link';
import {getUserInfo} from '@/actions/auth';
import {NPCWithCampaigns} from '@/types/drizzle';
import DeleteNPCModal from '../DeleteNPCModal';
import DialogueForm from '../forms/DialogueForm';

export default async function NPCCard({npcData}: {npcData: NPCWithCampaigns}) {
	const {npc, campaigns} = npcData;
	const {user} = await getUserInfo();
	return (
		<div className='card w-96 bg-base-100 shadow-xl'>
			<div className='card-body'>
				<h2 className='card-title'>{npc.npc_name}</h2>
				<p>{npc.description}</p>
				<div className='card-actions'>
					<ul>
						<h3 className='underline font-semibold'>Campaigns:</h3>
						{campaigns &&
							campaigns.map((c) => (
								<li key={c.id}>
									<Link href={`/${user?.username}/campaigns/${c.id}`}>
										{c.campaign_name}
									</Link>
								</li>
							))}
					</ul>
					<div className='flex w-full justify-center'>
						<DeleteNPCModal id={npc.id} />
					</div>
				</div>
			</div>
		</div>
	);
}
