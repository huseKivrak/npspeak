'use client';

import {useEffect} from 'react';
import {useForm, FieldPath} from 'react-hook-form';
import {useFormState} from 'react-dom';
import {signInAction} from '@/actions/auth';
import {SubmitButton} from '../buttons/SubmitButton';
import {Input} from '@nextui-org/react';
import {ActionStatus} from '@/types/drizzle';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginSchema} from '@/database/drizzle/validation';
import {ErrorMessage} from '@hookform/error-message';
import {ErrorToast} from '../ErrorToast';

type Inputs = {
	email: string;
	password: string;
};

export default function LoginForm() {
	const [state, formAction] = useFormState<ActionStatus, FormData>(
		signInAction,
		{
			status: 'idle',
			message: '',
		}
	);
	const {
		register,
		formState: {errors},
		setError,
	} = useForm<Inputs>({
		mode: 'onBlur',
		criteriaMode: 'all',
		resolver: zodResolver(loginSchema),
	});

	useEffect(() => {
		if (state.status === 'idle') return;
		if (state.status === 'error') {
			console.error(state.errors);
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
				{...register('email')}
			/>
			<ErrorMessage
				name='email'
				errors={errors}
				render={({message}) => <ErrorToast text={message} />}
			/>
			<Input
				isRequired
				type='password'
				label='password'
				variant='bordered'
				placeholder='••••••••'
				{...register('password')}
			/>
			<ErrorMessage
				name='password'
				errors={errors}
				render={({message}) => <ErrorToast text={message} />}
			/>
			<SubmitButton
				formAction={formAction}
				pendingText='signing in...'
				color='success'
			>
				login
			</SubmitButton>
		</form>
	);
}
