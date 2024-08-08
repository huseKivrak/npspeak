import { redirect } from 'next/navigation';
import { getUserProfile } from '@/actions/auth';
import { VoiceSampler } from '@/components/landingPage/VoiceSampler';
import { getAllElevenLabsVoices } from '@/actions/elevenLabs';
import { WorkflowAccordian } from '@/components/landingPage/WorkflowAccordian';
import { Hero } from '@/components/landingPage/Hero';

export default async function Index() {
  const { user } = await getUserProfile();
  if (user) {
    redirect('/dashboard');
  }

  const voiceResponse = await getAllElevenLabsVoices();
  const voices = voiceResponse.status === 'success' ? voiceResponse.data : [];
  return (
    <div className="flex flex-col items-center text-center">
      <Hero />
      {/* <WorkflowAccordian /> */}
      {voices && <VoiceSampler voiceOptions={voices} />}
    </div>
  );
}
