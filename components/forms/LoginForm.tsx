'use client';

import {useForm} from 'react-hook-form';
import Link from 'next/link';
import {signInAction} from '@/actions/auth';
import {SubmitButton} from '../buttons/SubmitButton';
import {Input} from '@nextui-org/react';

type Inputs = {
	email: string;
	password: string;
};

export default function LoginForm() {
	const {register} = useForm<Inputs>();
	return (
		<div className='flex flex-col flex-1 w-full px-4 sm:max-w-md items-center'>
			<h2 className='text-3xl font-thin tracking-widest mt-2'>login</h2>
			<form className='' action={signInAction}>
				<Input
					isRequired
					type='email'
					label='email'
					placeholder='you@example.com'
					variant='bordered'
					className='max-w-xs'
					{...register('email')}
				/>
				<Input
					isRequired
					type='password'
					label='password'
					placeholder='••••••••'
					className='max-w-xs'
					{...register('password')}
				/>
				<SubmitButton className='max-w-xs' text={'sign in'} />
				<span className=''>
					no account?
					<Link href='signup' className=''>
						sign up here
					</Link>
				</span>
			</form>
		</div>
	);
}
