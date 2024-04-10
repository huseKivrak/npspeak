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
import {ErrorToast} from '../ErrorToast';
import {ErrorMessage} from '@hookform/error-message';

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
	} = useForm<Inputs>({resolver: zodResolver(loginSchema)});

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
			{state.status === 'error' && <ErrorToast text={state.message} />}
			<Input
				isRequired
				type='email'
				label='email'
				placeholder='you@example.com'
				variant='bordered'
				{...register('email')}
			/>
			<ErrorMessage
				errors={errors}
				name='email'
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
			<SubmitButton formAction={formAction} pendingText='signing in...'>
				login
			</SubmitButton>
		</form>
	);
}
