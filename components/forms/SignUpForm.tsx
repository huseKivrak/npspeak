'use client';
import {signUpAction} from '@/actions/auth';
import {useFormState} from 'react-dom';
import SendEmailIcon from '@/components/icons/SendEmailIcon';
import {SubmitButton} from '@/components/buttons/SubmitButton';

export default function SignUpForm() {
	const [message, formAction] = useFormState(signUpAction, '');
	return (
		<div className='flex flex-col w-full sm:max-w-md justify-center items-center gap-4'>
			<h2 className='text-4xl font-extralight tracking-widest mt-24'>signup</h2>
			<form
				action={formAction}
				className='animate-in flex flex-col max-w-fit justify-items-center gap-2'
			>
				<label className='font-thin tracking-widest' htmlFor='email'>
					email
				</label>
				<input
					className='rounded-md px-4 py-2 border mb-1 font-thin tracking-widest'
					name='email'
					placeholder='you@example.com'
					required
				/>
				<label className='font-thin tracking-widest' htmlFor='username'>
					username
				</label>
				<input
					className='rounded-md px-4 py-2 border mb-1 font-thin tracking-widest'
					name='username'
					placeholder='your username'
					required
				/>

				<label className='font-thin tracking-widest' htmlFor='password'>
					password
				</label>
				<input
					className='rounded-md px-4 py-2 border mb-1 font-thin tracking-widest'
					type='password'
					name='password'
					placeholder='••••••••'
					required
				/>
				<label className='font-thin tracking-widest' htmlFor='password2'>
					confirm password
				</label>
				<input
					className='rounded-md px-4 py-2 border mb-1 font-thin tracking-widest'
					type='password'
					name='password2'
					placeholder='••••••••'
					required
				/>
				<span className='flex flex-col items-center'>
					<SubmitButton
						text={'create account'}
						className={'btn btn-secondary font-light w-4/5 rounded-md py-2'}
					>
						<SendEmailIcon className='w-5' />
					</SubmitButton>
					{message && <p className='text-red-500'>{message}</p>}
				</span>
			</form>
		</div>
	);
}
