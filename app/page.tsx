import {redirect} from 'next/navigation';
import {getUserInfo} from '@/actions/auth';
import SignUpForm from '@/components/forms/SignUpForm';
import {WorkflowAccordian} from '@/components/WorkflowAccordian';
import {VoiceSampler} from '@/components/VoiceSampler';
import {getAllElevenLabsVoices} from '@/actions/elevenLabs';

export default async function Index() {
	const {user} = await getUserInfo();
	if (user) {
		redirect('/dashboard');
	}

	const voiceResponse = await getAllElevenLabsVoices();
	const voices = voiceResponse.status === 'success' ? voiceResponse.data : [];
	const voiceSample = voices.slice(0, 5);
	return (
		<div className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
			<div className='inline-block text-center justify-center'>
				<h1 className='text-4xl lg:text-6xl'>npSpeak</h1>
				<p className='text-lg'>NPC management made simple.</p>
				<div className='flex flex-col items-center justify-center gap-4 mt-8'>
					<h2 className='text-2xl'>
						Audio for your characters in 3 easy steps
					</h2>
					<WorkflowAccordian />
				</div>
				<div className='flex flex-col items-start mt-8 space-y-2'>
					{voices ? (
						<VoiceSampler voices={voiceSample} />
					) : (
						<div>Voice Sampler Unavailable</div>
					)}
				</div>
				<SignUpForm />
			</div>
		</div>
	);
}
