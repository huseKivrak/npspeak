'use client';

import {SubmitButton} from '@/components/buttons/SubmitButton';
import {useFormState} from 'react-dom';
import {CreateVoiceClone} from '@/actions/elevenLabs';

const initialState = {
	message: '',
};

export default function CreateClone() {
	const [state, formAction] = useFormState(CreateVoiceClone, initialState);

	return (
		<div className='flex-1 w-full flex flex-col gap-20 items-center'>
			<div className='animate-in flex flex-col gap-20 opacity-0 max-w-4xl px-3'>
				<h1 className='text-4xl font-extralight tracking-widest flex items-center justify-center mt-24'>
					create a clone
				</h1>
				<form action={formAction} className='flex flex-col gap-8'>
					<input
						type='text'
						name='name'
						placeholder='name'
						className='form-control text-center tracking-widest'
						required
					/>
					<textarea
						name='description'
						placeholder='description'
						className='form-control text-center tracking-widest text-xl'
					/>
					<input
						type='file'
						name='file'
						accept='audio/*'
						className='file-input'
						required
					/>
					<SubmitButton text={'clone me'} className='btn-sm' />
				</form>
				{state?.message && (
					<p className='p-2 text-center font-thin tracking-widest'>
						{state.message}
					</p>
				)}
			</div>
		</div>
	);
}
