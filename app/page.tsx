import { redirect } from 'next/navigation';
import { getUserProfile } from '@/actions/auth';
import { Hero } from '@/components/landingPage/Hero';
import { Features } from '@/components/landingPage/Features';
import { VoiceSampler } from '@/components/landingPage/VoiceSampler';
import { loadJSONVoiceData } from '@/config/server/voiceDataHelpers';


export default async function Index() {
  const { user } = await getUserProfile();
  if (user) {
    redirect('/dashboard');
  }

  const voices = await loadJSONVoiceData();

  return (
    <div className="flex flex-col space-y-8">
      <Hero />
      <Features />
      <VoiceSampler voiceOptions={voices} />
    </div>
  );
}
