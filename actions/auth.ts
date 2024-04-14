'use server';

import {createClientOnServer} from '@/utils/supabase/server';
import {headers} from 'next/headers';
import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';
import {signupSchema, loginSchema} from '@/database/drizzle/validation';
import {ZodError} from 'zod';
import {ActionStatus} from '@/types/drizzle';
import {UserAuth} from '@/types/supabase';

export const signUpAction = async (
	prevState: ActionStatus,
	formData: FormData
): Promise<ActionStatus> => {
	const origin = headers().get('origin');

	try {
		const {email, username, password} = signupSchema.parse(formData);

		const cookieStore = cookies();
		const supabase = createClientOnServer(cookieStore);

		const {error} = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${origin}/auth/callback`,
				data: {
					username,
				},
			},
		});
		if (error) {
			return {
				status: 'error',
				message: 'Oops! Something went wrong. Please try again',
				errors: [
					{
						path: 'confirm_password',
						message: 'Oops! Something went wrong. Please try again',
					},
				],
			};
		}
	} catch (error) {
		if (error instanceof ZodError) {
			console.log('zod error: ', error);
			return {
				status: 'error',
				message: 'Invalid form data',
				errors: error.issues.map((issue) => ({
					path: issue.path.join('.'),
					message: `${issue.message}`,
				})),
			};
		} else {
			console.error('Error during signup: ', error);
			return {
				status: 'error',
				message: 'Oops! Something went wrong. Please try again',
				errors: [
					{
						path: 'confirm_password',
						message: 'Oops! Something went wrong. Please try again',
					},
				],
			};
		}
	}
	redirect('/signup/success');
};

export const signInAction = async (
	prevState: ActionStatus,
	formData: FormData
): Promise<ActionStatus> => {
	try {
		const {email, password} = loginSchema.parse(formData);

		const cookieStore = cookies();
		const supabase = createClientOnServer(cookieStore);

		const {error} = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			return {
				status: 'error',
				message: 'Invalid email/password',
				errors: [
					{
						path: 'password',
						message: 'Incorrect email/password. Please try again',
					},
				],
			};
		}
	} catch (error) {
		if (error instanceof ZodError) {
			console.error('zod error: ', error);
			return {
				status: 'error',
				message: 'Invalid form data',
				errors: error.issues.map((issue) => ({
					path: issue.path.join('.'),
					message: `${issue.message}`,
				})),
			};
		}
		return {
			status: 'error',
			message: 'Unexpected error',
		};
	}

	redirect(`/`);
};

export const logoutAction = async () => {
	const cookieStore = cookies();
	const supabase = createClientOnServer(cookieStore);

	const {error} = await supabase.auth.signOut();
	if (error) {
		console.error('Logout Error:', error);
		redirect('/?message=error');
	}

	redirect('/?message=logout');
};

//streamlined method for returning up-to-date user info
export const getUserInfo = async (): Promise<UserAuth> => {
	const cookieStore = cookies();
	const supabase = createClientOnServer(cookieStore);
	try {
		const {
			data: {user},
			error,
		} = await supabase.auth.getUser();
		if (!user) {
			console.error(`getUserInfo error ${error?.status}`);
			return {user: null, error: `Auth Error: ${error?.message}`};
		}
		const username = user.user_metadata.username;
		const id = user.id;
		const lastSignIn = user.last_sign_in_at ?? null;
		return {user: {id, username, lastSignIn}, error: null};
	} catch (error) {
		console.error('Error:', error);
		return {user: null, error: `Unexpected error: ${error}`};
	}
};
