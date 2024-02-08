'use client';

import {createClient} from '@/utils/supabase/defaults/client';
import {getUsername} from '@/utils/supabase/helpers';
import {useRouter} from 'next/navigation';
import CampaignForm from '@/components/forms/CampaignForm';
import {useState, useEffect} from 'react';
import Link from 'next/link';

export default function UserPage({params}: {params: {username: string}}) {
	const [showCampaignForm, setShowCampaignForm] = useState(false);
	const [authUsername, setAuthUsername] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		const fetchUserData = async () => {
			const supabase = createClient();

			try {
				const {
					data: {session},
				} = await supabase.auth.getSession();
				if (session) {
					const user = session.user;
					const username = await getUsername(user);

					//redirect if route username doesn't match authenticated user (reserves '/your-username' for that user)
					if (username.toLowerCase() !== params.username.toLowerCase()) {
						router.push('/');
					}
					setAuthUsername(username);
				} else {
					router.push('/');
				}
			} catch (error) {
				console.error('Error: ', error);
				router.push('/');
			}
		};
		fetchUserData();
	}, [params.username, router]);
	return (
		<div className='flex flex-col gap-4'>
			<h1 className=''>hi, {authUsername}</h1>
			<Link href={`/${authUsername}/campaigns`}>my campaigns</Link>
			<button
				className='btn btn-ghost'
				onClick={(prevState) => setShowCampaignForm(!prevState)}
			>
				create a new campaign
			</button>
			{showCampaignForm && <CampaignForm />}
		</div>
	);
}
