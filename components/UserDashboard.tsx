'use client';
import {CampaignWithNPCs, DetailedNPC} from '@/types/drizzle';
import Link from 'next/link';
import {BasicUserInfo} from '@/actions/auth';
export default function UserDashboard({
	user,
	campaigns,
	npcs,
}: {
	user: BasicUserInfo;
	campaigns: CampaignWithNPCs[] | null;
	npcs: DetailedNPC[] | null;
}) {
	return (
		<div className='flex flex-col items-center justify-center gap-4'>
			<h1 className='text-3xl'>{user.username}&apos;s dashboard</h1>
			<div>
				<ul>
					<h2 className='text-2xl tracking-widest text-info'>campaigns</h2>
					{campaigns?.map((c) => (
						<li key={c.id}>
							<Link href={`/${user.username}/campaigns/${c.id}`}>
								{c.campaign_name}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<Link href={`/${user.username}/campaigns/create`}>
				<button className='btn btn-secondary btn-sm'>
					create a new campaign
				</button>
			</Link>
			<ul>
				<h2 className='text-2xl text-info tracking-widest'>NPCs</h2>
				{npcs?.map((n) => (
					<li key={n.id}>
						<Link href={`${user.username}/npcs/${n.id}`}>{n.npc_name}</Link>
					</li>
				))}
			</ul>
			<Link href={`/${user.username}/npcs/create`}>
				<button className='btn btn-secondary btn-sm'>create a new NPC</button>
			</Link>
		</div>
	);
}
