import { redirect } from 'next/navigation';
import { getUserProfile } from '@/actions/auth';
import { VoiceSampler } from '@/components/landingPage/VoiceSampler';
import { Hero } from '@/components/landingPage/Hero';
import { elevenLabsVoices } from '@/lib/elevenLabsVoices';

export default async function Index() {
  const { user } = await getUserProfile();
  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="flex flex-col items-center text-center">
      <Hero />
      <VoiceSampler voiceOptions={elevenLabsVoices} />
    </div>
  );
}
