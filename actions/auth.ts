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

export const signInAction = async (formData: FormData) => {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	console.log('signing in user: ', email, password);
	const cookieStore = cookies();
	const supabase = createClientOnServer(cookieStore);

	const {error} = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		console.error('Supabase Auth Error - Login: ', error);
		return redirect(
			'/login?message=incorrect email/password. please try again'
		);
		// return redirect('/error');
	}
	return redirect(`/`);
};

export const logoutAction = async () => {
	const cookieStore = cookies();
	const supabase = createClientOnServer(cookieStore);

	const {error} = await supabase.auth.signOut();
	if (error) {
		console.error('Error:', error);
		return redirect('/error'); //todo: handle logout error
	}

	return redirect('/?message=logout');
};

//returns a user from sessions saved in cookies
//! not for most up-to-date user (use supabase.auth.getUser() instead)
export const old_getUserFromSession = async () => {
	const cookieStore = cookies();
	const supabase = createClientOnServer(cookieStore);
	try {
		const {
			data: {session},
		} = await supabase.auth.getSession();
		return session?.user;
	} catch (error) {
		console.error('Error:', error);
		return null;
	}
};

//simple helper for getting nested username value for now
//todo: integrate profiles table in lieu of auth:
//'db.select(username).from(profiles).where(eq(profiles.id, user.id))'
export const old_getUsername = async (user?: User) => {
	if (user) return user.user_metadata.username;

	const sessionUser = await old_getUserFromSession();
	return sessionUser?.user_metadata.username;
};

export interface BasicUserInfo {
	id: string;
	username: string;
	lastSignIn: string | null;
}

interface UserAuth {
	user: BasicUserInfo | null;
	error: string | null;
}
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
