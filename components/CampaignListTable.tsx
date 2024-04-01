'use client';
import {CampaignWithNPCs} from '@/types/drizzle';
import Link from 'next/link';
import {DeleteModal} from './forms/DeleteModal';
import {deleteCampaignAction} from '@/actions/db/campaigns';
import {PiSkullBold} from 'react-icons/pi';

export default function CampaignListTable({
	campaigns,
}: {
	campaigns: CampaignWithNPCs[];
}) {
	return (
		<div className='overflow-x-auto'>
			<div className='flex justify-start items-center'>
				<h2 className='text-2xl font-bold'>Campaigns</h2>
				<Link href={`/campaigns/create`} className='btn btn-accent btn-xs ml-4'>
					+ Create Campaign
				</Link>
			</div>
			<table className='table'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>NPCs</th>
						<th>Created</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{campaigns.map((campaign) => (
						<tr key={campaign.id} className='hover'>
							<td className='link-hover text-secondary font-bold'>
								<Link href={`/campaigns/${campaign.id}`}>
									{campaign.campaign_name}
								</Link>
							</td>
							<td>{campaign.description}</td>
							<td className='flex flex-col gap-2 text-primary font-semibold'>
								<ul>
									{campaign.npcs.map((npc) => (
										<li key={npc.id}>
											<Link href={`/npcs/${npc.id}`}>{npc.npc_name}</Link>
										</li>
									))}
								</ul>
							</td>
							<td>{campaign.created_at.toString()}</td>
							<td>
								<DeleteModal
									idName='campaign_id'
									serverAction={deleteCampaignAction}
									id={campaign.id}
									className='group btn btn-outline btn-error btn-xs hover:bg-error hover:text-white'
								>
									<div className='tooltip tooltip-error' data-tip='delete'>
										<PiSkullBold className='font-bold text-lg text-error group-hover:text-white' />
									</div>
								</DeleteModal>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
