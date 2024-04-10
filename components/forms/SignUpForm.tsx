'use client';
import {useForm, FieldPath} from 'react-hook-form';
import {signUpAction} from '@/actions/auth';
import {useFormState} from 'react-dom';
import {zodResolver} from '@hookform/resolvers/zod';
import {SendEmailIcon} from '@/components/icons';
import {SubmitButton} from '@/components/buttons/SubmitButton';
import {ActionStatus} from '@/types/drizzle';
import {useEffect} from 'react';
import {ErrorToast} from '../ErrorToast';
import {Input} from '@nextui-org/react';
import {ErrorMessage} from '@hookform/error-message';
import {signupSchema} from '@/database/drizzle/validation';

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

	const {
		register,
		formState: {errors},
		setError,
	} = useForm<Inputs>({resolver: zodResolver(signupSchema)});

	useEffect(() => {
		if (state.status === 'idle') return;
		if (state.status === 'error') {
			state.errors?.forEach((error) => {
				setError(error.path as FieldPath<Inputs>, {
					message: error.message,
				});
			});
		}
	}, [state, setError]);
	return (
		<form className='flex flex-col max-w-fit items-center gap-2'>
			<Input
				isRequired
				type='email'
				label='email'
				placeholder='you@example.com'
				variant='bordered'
				className='max-w-xs'
				{...register('email')}
			/>
			<ErrorMessage
				errors={errors}
				name='email'
				render={({message}) => <ErrorToast text={message} />}
			/>

			<Input
				isRequired
				label='username'
				placeholder='your username'
				variant='bordered'
				className='max-w-xs'
				{...register('username')}
			/>
			<ErrorMessage
				errors={errors}
				name='username'
				render={({message}) => <ErrorToast text={message} />}
			/>

			<Input
				isRequired
				type='password'
				label='password'
				placeholder='••••••••'
				variant='bordered'
				className='max-w-xs'
				{...register('password')}
			/>
			<ErrorMessage
				errors={errors}
				name='password'
				render={({message}) => <ErrorToast text={message} />}
			/>

			<Input
				isRequired
				type='password'
				label='confirm password'
				placeholder='••••••••'
				variant='bordered'
				className='max-w-xs'
				{...register('confirm_password')}
			/>
			<ErrorMessage
				errors={errors}
				name='confirm_password'
				render={({message}) => <ErrorToast text={message} />}
			/>
			<span className='flex flex-col items-center'>
				<SubmitButton
					formAction={formAction}
					pendingText='creating account...'
					endContent={<SendEmailIcon width={24} />}
					color='success'
				>
					create account
				</SubmitButton>
			</span>
		</form>
	);
}
