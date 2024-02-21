'use client';
import {CampaignWithNPCs, NPCWithCampaigns} from '@/types/drizzle';
import {User} from '@supabase/supabase-js';
import {useState} from 'react';
import CampaignForm from './forms/CampaignForm';
import NPCForm from './forms/NPCForm';
import Link from 'next/link';
import {
	transformCampaignOptions,
	transformNPCOptions,
} from '@/utils/helpers/formHelpers';
import {FormOptions} from '@/types/drizzle';
export default function UserDashboard({
	user,
	campaigns,
	npcs,
}: {
	user: User;
	campaigns: CampaignWithNPCs[] | null;
	npcs: NPCWithCampaigns[] | null;
}) {
	const [showCampaignForm, setShowCampaignForm] = useState(false);
	const [showNPCForm, setShowNPCForm] = useState(false);

	const username = user.user_metadata.username;
	const campaignOptions: FormOptions = campaigns
		? transformCampaignOptions(campaigns)
		: [];
	const npcOptions: FormOptions = npcs ? transformNPCOptions(npcs) : [];

	return (
		<div className='flex flex-col gap-2'>
			<h1 className='text-3xl'>{username}&apos;s dashboard</h1>
			<ul>
				<h2 className='text-2xl underline tracking-widest'>campaigns</h2>
				{campaigns?.map((c) => (
					<li key={c.campaign.id}>
						<Link href={`/${username}/campaigns/${c.campaign.id}`}>
							{c.campaign.campaign_name}
						</Link>
					</li>
				))}
			</ul>
			{/* <button
				className='btn btn-primary btn-sm'
				onClick={() => setShowCampaignForm(!showCampaignForm)}
			>
				{!showCampaignForm ? 'add a new campaign' : 'cancel'}
			</button>
			{showCampaignForm && <CampaignForm npcOptions={npcOptions} />} */}
			<Link href={`/${username}/campaigns/create`}>
				<button className='btn btn-secondary btn-sm'>
					create a new campaign
				</button>
			</Link>
			<ul>
				<h2 className='text-2xl underline tracking-widest'>NPCs</h2>
				{npcs?.map((n) => (
					<li key={n.npc.id}>
						<Link href={`${username}/npcs/${n.npc.id}`}>{n.npc.npc_name}</Link>
					</li>
				))}
			</ul>
			{/* <button
				className='btn btn-primary btn-sm'
				onClick={() => setShowNPCForm(!showNPCForm)}
			>
				{!showNPCForm ? 'add a new NPC' : 'cancel'}
			</button>
			{showNPCForm && <NPCForm campaignOptions={campaignOptions} />} */}
			<Link href={`/${username}/npcs/create`}>
				<button className='btn btn-secondary btn-sm'>create a new NPC</button>
			</Link>
		</div>
	);
}
