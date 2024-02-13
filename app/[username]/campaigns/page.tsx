import {getCampaignsAndNPCs} from '@/server-actions/drizzle';
import OpenScrollCard from '@/components/cards/OpenScrollCard';

export default async function UserCampaignsPage({
	params,
}: {
	params: {
		username: string;
	};
}) {
	const username = params.username;
	const userData = await getCampaignsAndNPCs();

	return (
		<div className='flex flex-col items-center'>
			<h1 className='text-4xl tracking-widest font-extralight my-4'>
				{username}&apos;s campaigns
			</h1>
			<ul className='flex flex-col w-full lg:flex-row gap-8'>
				{userData &&
					userData.map((item) => (
						<li key={item.campaign.id}>
							{/* <CampaignCard campaign={item.campaign} NPCs={item.npcs} /> */}
							<OpenScrollCard campaignData={item} />
						</li>
					))}
			</ul>
		</div>
	);
}
