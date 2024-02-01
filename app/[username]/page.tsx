'use client';

import { createClient } from '@/utils/supabase/default/client';
import { getUsername } from '@/utils/supabase/helpers';
import { useRouter } from 'next/navigation';
import CampaignForm from '@/components/forms/CampaignForm';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default async function UserPage({ params }: { params: { username: string } }) {
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [authUsername, setAuthUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const supabase = createClient();

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          const username = getUsername(session.user).toLowerCase();
          //redirect if route username doesn't match authenticated user (reserves '/your-username' for that user)
          if (username !== params.username.toLowerCase()) {
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

  const handleShowCampaignForm = () => {
    setShowCampaignForm((prevState) => !prevState);
  };

  return (
    <div className='flex flex-col gap-4 justify-center'>
      <h1 className=''>hi, {authUsername}</h1>
      <Link href={`/${authUsername}/campaigns`}>my campaigns</Link>
      <button className='btn btn-ghost' onClick={handleShowCampaignForm}>
        create a new campaign
      </button>
      {showCampaignForm && <CampaignForm />}
    </div>
  );
}
