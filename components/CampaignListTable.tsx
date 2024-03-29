'use client';
import {usePathname} from 'next/navigation';
import {CampaignWithNPCs} from '@/types/drizzle';
import Link from 'next/link';
import DeleteCampaignModal from './forms/DeleteCampaignModal';
import {PiSkullBold} from 'react-icons/pi';

export default function CampaignListTable({
	campaigns,
}: {
	campaigns: CampaignWithNPCs[];
}) {
	const pathname = usePathname();
	const username = pathname.split('/')[1];
	return (
		<div className='overflow-x-auto'>
			<div className='flex justify-start items-center'>
				<h2 className='text-2xl font-bold'>Campaigns</h2>
				<Link
					href={`/${username}/campaigns/create`}
					className='btn btn-accent btn-xs ml-4'
				>
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
								<Link href={`/${username}/campaigns/${campaign.id}`}>
									{campaign.campaign_name}
								</Link>
							</td>
							<td>{campaign.description}</td>
							<td className='flex flex-col gap-2 text-primary font-semibold'>
								<ul>
									{campaign.npcs.map((npc) => (
										<li key={npc.id}>
											<Link href={`/${username}/npcs/${npc.id}`}>
												{npc.npc_name}
											</Link>
										</li>
									))}
								</ul>
							</td>
							<td>{campaign.created_at.toString()}</td>
							<td>
								<DeleteCampaignModal
									id={campaign.id}
									className='group btn btn-outline btn-error btn-xs hover:bg-error hover:text-white'
								>
									<div className='tooltip tooltip-error' data-tip='delete'>
										<PiSkullBold className='font-bold text-lg text-error group-hover:text-white' />
									</div>
								</DeleteCampaignModal>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
