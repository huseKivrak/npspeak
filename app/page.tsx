import { redirect } from 'next/navigation';
import { getUserInfo } from '@/actions/auth';
import { VoiceSampler } from '@/components/landingPage/VoiceSampler';
import { getAllElevenLabsVoices } from '@/actions/elevenLabs';
import { WorkflowAccordian } from '@/components/landingPage/WorkflowAccordian';
import { Hero } from '@/components/landingPage/Hero';

export default async function Index({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const { user } = await getUserInfo();
  if (user) {
    redirect('/dashboard');
  }

  const voiceResponse = await getAllElevenLabsVoices();
  const voices = voiceResponse.status === 'success' ? voiceResponse.data : [];
  const voiceSample = voices.slice(0, 12);

  return (
    <div className="flex flex-col items-center text-center gap-12">
      {searchParams?.message === 'logout' && (
        <div className="bg-success text-small p-2 rounded-small w-fit">
          You have been logged out.
        </div>
      )}
      <Hero />
      {/* <WorkflowAccordian /> */}
      {voices && <VoiceSampler voices={voiceSample} />}
    </div>
  );
}
