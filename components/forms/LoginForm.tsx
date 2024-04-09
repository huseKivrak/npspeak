'use client';

import {useForm} from 'react-hook-form';
import Link from 'next/link';
import {signInAction} from '@/actions/auth';
import {SubmitButton} from '../buttons/SubmitButton';
import {Button, Input} from '@nextui-org/react';

type Inputs = {
	email: string;
	password: string;
};

export default function LoginForm() {
	const {register} = useForm<Inputs>();
	return (
		<div className='flex flex-col flex-1 w-full px-4 sm:max-w-md items-center gap'>
			<h2 className='text-3xl font-thin tracking-widest mt-2'>login</h2>
			<form>
				<Input
					isRequired
					type='email'
					label='email'
					placeholder='you@example.com'
					variant='bordered'
					{...register('email')}
				/>
				<Input
					isRequired
					type='password'
					label='password'
					variant='bordered'
					placeholder='••••••••'
					{...register('password')}
				/>
				<SubmitButton formAction={signInAction} pendingText='signing in...'>
					login
				</SubmitButton>
			</form>
			<div className=''>
				<p>no account?</p>
				<Button>
					<Link href='signup'>sign up here</Link>
				</Button>
			</div>
		</div>
	);
}
