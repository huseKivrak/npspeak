'use server';

import {createClientOnServer} from '@/utils/supabase/server';
import {createClientOnClient} from '@/utils/supabase/client';
import {headers} from 'next/headers';
import {redirect} from 'next/navigation';
import {AuthError, User} from '@supabase/supabase-js';
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
		const {email, password, username} = signupSchema.parse(formData);

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
			if (error instanceof AuthError) {
				return {
					status: 'error',
					message: `Auth error: ${error.message}`,
				};
			}
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
			return redirect('/error');
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
						path: 'email',
						message: 'Incorrect email/password. Please try again',
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
		}
	}

	redirect(`/`);
};

export const logoutAction = async () => {
	const cookieStore = cookies();
	const supabase = createClientOnServer(cookieStore);

	const {error} = await supabase.auth.signOut();
	if (error) {
		console.error('Error:', error);
		return redirect('/error'); //todo: handle logout error
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
			console.error('Auth Error:', error);
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
