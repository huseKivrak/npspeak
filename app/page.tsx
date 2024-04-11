import {redirect} from 'next/navigation';
import {getUserInfo} from '@/actions/auth';
import {WorkflowAccordian} from '@/components/WorkflowAccordian';
import {VoiceSampler} from '@/components/VoiceSampler';
import {getAllElevenLabsVoices} from '@/actions/elevenLabs';
import {Hero} from '@/components/Hero';
import {Divider} from '@nextui-org/divider';
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
		<div className='flex flex-col items-center justify-center text-center py-8 md:py-10'>
			{searchParams?.message === 'logout' && (
				<div className='bg-success text-white text-sm p-2 rounded-md w-fit mt-0 mb-2'>
					You have been logged out.
				</div>
			)}
			<Hero />
			<WorkflowAccordian />
			<Divider className='my-4' />
			<div className='flex flex-col items-start space-y-2'>
				{voices ? (
					<VoiceSampler voices={voiceSample} />
				) : (
					<div>Voice Sampler Unavailable</div>
				)}
			</div>
		</div>
	);
}
