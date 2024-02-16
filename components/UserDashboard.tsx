'use client';
import {CampaignsWithNPCs, NPCsWithCampaigns} from '@/server-actions/drizzle';
import {User} from '@supabase/supabase-js';
import {useState} from 'react';
import CampaignForm from './forms/CampaignForm';
import NPCForm from './forms/NPCForm';
import OpenScrollCard from './cards/OpenScrollCard';

export default function UserDashboard({
	user,
	campaigns,
	npcs,
}: {
	user: User;
	campaigns: CampaignsWithNPCs[] | null;
	npcs: NPCsWithCampaigns[] | null;
}) {
	const [showCampaignForm, setShowCampaignForm] = useState(false);
	const [showNPCForm, setShowNPCForm] = useState(false);

	return (
		<div className='flex flex-col gap-2'>
			<h1 className='text-3xl'>
				{user.user_metadata.username}&apos;s dashboard
			</h1>
			<ul>
				<h2 className='text-2xl underline tracking-widest'>campaigns</h2>
				{campaigns?.map((c) => (
					<li key={c.campaign.id}>
						<OpenScrollCard campaignData={c} />
					</li>
				))}
			</ul>
			<button
				className='btn btn-primary btn-sm'
				onClick={() => setShowCampaignForm(!showCampaignForm)}
			>
				add a new campaign
			</button>
			{showCampaignForm && <CampaignForm />}
			<ul>
				<h2 className='text-2xl underline tracking-widest'>NPCs</h2>
				{npcs?.map((n) => (
					<li key={n.npc.id}>
						<p>{n.npc.npc_name}</p>
					</li>
				))}
			</ul>
			<button
				className='btn btn-primary btn-sm'
				onClick={() => setShowNPCForm(!showNPCForm)}
			>
				add a new NPC
			</button>
			{showNPCForm && <NPCForm />}
		</div>
	);
}
