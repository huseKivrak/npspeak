import { redirect } from 'next/navigation';
import { getUserProfile } from '@/actions/auth';
import { Hero } from '@/components/landingPage/Hero';
import { Features } from '@/components/landingPage/Features';
import { VoiceSampler } from '@/components/landingPage/VoiceSampler';
import { db } from '@/database/drizzle';



export default async function Index() {
  const { user } = await getUserProfile();
  if (user) {
    redirect('/dashboard');
  }

  const voices = await db.query.voices.findMany();


  return (
    <div className="flex flex-col space-y-8">
      <Hero />
      <Features />
      <VoiceSampler voiceOptions={voices} />
    </div>
  );
}
