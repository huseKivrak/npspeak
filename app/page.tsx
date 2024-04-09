import {redirect} from 'next/navigation';
import {getUserInfo} from '@/actions/auth';
import SignUpForm from '@/components/forms/SignUpForm';
import {WorkflowAccordian} from '@/components/WorkflowAccordian';
import {VoiceSampler} from '@/components/VoiceSampler';
import {getAllElevenLabsVoices} from '@/actions/elevenLabs';

export default async function Index({
	searchParams,
}: {
	searchParams: {message: string};
}) {
	const {user} = await getUserInfo();
	if (user) {
		redirect('/dashboard');
	}

	const voiceResponse = await getAllElevenLabsVoices();
	const voices = voiceResponse.status === 'success' ? voiceResponse.data : [];
	const voiceSample = voices.slice(0, 12);

	return (
		<div className='flex flex-col items-center justify-center py-8 md:py-10'>
			{searchParams?.message === 'logout' && (
				<div className='bg-success text-white text-sm p-2 rounded-md w-fit mt-0 mb-2'>
					You have been logged out.
				</div>
			)}
			<div className='text-center '>
				<h1 className='text-4xl lg:text-6xl font-bold text-secondary-500'>
					npSpeak
				</h1>
				<p className='text-lg'>NPC Dialogue made simple.</p>

				<h2 className='text-2xl my-4'>Character audio in 3 easy steps</h2>
				<WorkflowAccordian />
				<div className='flex flex-col items-start mt-8 space-y-2'>
					{voices ? (
						<VoiceSampler voices={voiceSample} />
					) : (
						<div>Voice Sampler Unavailable</div>
					)}
				</div>
			</div>
		</div>
	);
}
