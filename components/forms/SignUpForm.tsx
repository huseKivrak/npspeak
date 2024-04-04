'use client';
import {useForm} from 'react-hook-form';
import {signUpAction} from '@/actions/auth';
import {useFormState} from 'react-dom';
import SendEmailIcon from '@/components/icons/SendEmailIcon';
import {SubmitButton} from '@/components/buttons/SubmitButton';
import {ActionStatus} from '@/types/drizzle';
import {useEffect, useState} from 'react';
import {ErrorToast} from '../ErrorToast';
import {Input} from '@nextui-org/react';

interface InputErrors {
	email?: string;
	username?: string;
	password?: string;
	confirm_password?: string;
}

type Inputs = {
	email: string;
	username: string;
	password: string;
	confirm_password: string;
};

export default function SignUpForm() {
	const [state, formAction] = useFormState<ActionStatus, FormData>(
		signUpAction,
		{
			status: 'idle',
			message: '',
		}
	);
	const [errors, setErrors] = useState<InputErrors>({});
	const {register} = useForm<Inputs>();

	useEffect(() => {
		if (state.status === 'idle') return;
		if (state.status === 'error') {
			state.errors?.forEach((issue) => {
				setErrors((prevErrors) => ({
					...prevErrors,
					[issue.path]: issue.message,
				}));
			});
		}
	});
	return (
		<div className='flex flex-col w-full sm:max-w-md justify-center items-center gap-4'>
			<h2 className='text-4xl font-extralight tracking-widest mt-24'>signup</h2>
			<form
				action={formAction}
				className='flex flex-col max-w-fit justify-items-center gap-2'
			>
				<label className='font-thin tracking-widest' htmlFor='email'>
					email
				</label>
				<Input
					isRequired
					type='email'
					label='email'
					placeholder='you@example.com'
					variant='bordered'
					className='max-w-xs'
					{...register('email')}
				/>
				{errors.email && <ErrorToast text={errors.email} />}
				<label className='font-thin tracking-widest' htmlFor='username'>
					username
				</label>
				<Input
					isRequired
					label='username'
					placeholder='your username'
					variant='bordered'
					className='max-w-xs'
					{...register('username')}
				/>
				{errors.username && <ErrorToast text={errors.username} />}

				<label className='font-thin tracking-widest' htmlFor='password'>
					password
				</label>
				<Input
					isRequired
					type='password'
					label='password'
					placeholder='••••••••'
					variant='bordered'
					className='max-w-xs'
					{...register('password')}
				/>
				{errors.password && <ErrorToast text={errors.password} />}

				<label className='font-thin tracking-widest' htmlFor='password2'>
					confirm password
				</label>
				<Input
					isRequired
					type='password'
					label='confirm password'
					placeholder='••••••••'
					variant='bordered'
					className='max-w-xs'
					{...register('confirm_password')}
				/>
				{errors.confirm_password && (
					<ErrorToast text={errors.confirm_password} />
				)}
				<span className='flex flex-col items-center'>
					<SubmitButton
						text={'create account'}
						className={'btn btn-secondary font-light w-4/5 rounded-md py-2'}
					>
						<SendEmailIcon className='w-12' />
					</SubmitButton>
				</span>
			</form>
		</div>
	);
}
