import { redirect } from 'next/navigation';
import { getUserProfile } from '@/actions/auth';
import { Hero } from '@/components/landingPage/Hero';
import { Features } from '@/components/landingPage/Features';
import { VoiceSampler } from '@/components/landingPage/VoiceSampler';
import { curatedVoices } from '@/lib/curatedVoices';



export default async function Index() {
  const { user } = await getUserProfile();
  if (user) {
    redirect('/dashboard');
  }


  return (
    <div className="flex flex-col space-y-4">
      <Hero />
      <Features />
      <VoiceSampler voiceOptions={curatedVoices} />
    </div>
  );
}
