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
  const voiceSample = voices.slice(0, 12);
  return (
    <div className="flex flex-col items-center text-center gap-12">
      <Hero />
      {/* <WorkflowAccordian /> */}
      {voices && <VoiceSampler voiceOptions={voiceSample} />}
    </div>
  );
}
