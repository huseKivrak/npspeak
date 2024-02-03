'use client';
import {useState, useEffect} from 'react';
import {getCampaignsAndNPCs, GroupedResults} from '@/utils/drizzle/helpers';
import {usePathname} from 'next/navigation';
import CampaignCard from '@/components/cards/CampaignCard';
import NPCCarousel from '@/components/NPCCarousel';

export default function UserCampaignsPage() {
	const [userData, setUserData] = useState<GroupedResults>([]);
	const path = usePathname();
	const username = path.split('/').filter(Boolean)[0];

	useEffect(() => {
		const fetchData = async () => {
			const data = await getCampaignsAndNPCs();
			if (data) {
				setUserData(data);
			}
		};

		fetchData();
	}, []);

	return (
		<div className='flex flex-col items-center'>
			<h1 className='text-4xl tracking-widest font-extralight my-4'>
				{username}&apos;s campaigns
			</h1>
			<ul className='flex flex-col w-full lg:flex-row gap-4'>
				{userData.map((item) => (
					<li key={item.campaign.id}>
						<CampaignCard campaign={item.campaign} NPCs={item.npcs} />
					</li>
				))}
			</ul>
		</div>
	);
}
