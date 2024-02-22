'use client';
import {CampaignWithNPCs, NPCWithCampaigns} from '@/types/drizzle';
import Link from 'next/link';
import {
	transformCampaignOptions,
	transformNPCOptions,
} from '@/utils/helpers/formHelpers';
import {FormOptions} from '@/types/drizzle';
import {BasicUserInfo} from '@/actions/auth';
export default function UserDashboard({
	user,
	campaigns,
	npcs,
}: {
	user: BasicUserInfo;
	campaigns: CampaignWithNPCs[] | null;
	npcs: NPCWithCampaigns[] | null;
}) {
	const campaignOptions: FormOptions = campaigns
		? transformCampaignOptions(campaigns)
		: [];
	const npcOptions: FormOptions = npcs ? transformNPCOptions(npcs) : [];
	return (
		<div className='flex flex-col items-center'>
			<h1 className='text-3xl'>{user.username}&apos;s dashboard</h1>
			<ul className=''>
				<h2 className='text-2xl tracking-widest text-info'>campaigns</h2>
				{campaigns?.map((c) => (
					<li key={c.campaign.id}>
						<Link href={`/${user.username}/campaigns/${c.campaign.id}`}>
							{c.campaign.campaign_name}
						</Link>
					</li>
				))}
			</ul>
			<Link href={`/${user.username}/campaigns/create`}>
				<button className='btn btn-secondary btn-sm'>
					create a new campaign
				</button>
			</Link>
			<ul>
				<h2 className='text-2xl text-info tracking-widest'>NPCs</h2>
				{npcs?.map((n) => (
					<li key={n.npc.id}>
						<Link href={`${user.username}/npcs/${n.npc.id}`}>
							{n.npc.npc_name}
						</Link>
					</li>
				))}
			</ul>
			<Link href={`/${user.username}/npcs/create`}>
				<button className='btn btn-secondary btn-sm'>create a new NPC</button>
			</Link>
		</div>
	);
}
