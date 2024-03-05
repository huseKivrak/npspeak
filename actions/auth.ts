'use server';

import {createClient} from '@/utils/supabase/server';
import {headers} from 'next/headers';
import {redirect} from 'next/navigation';
import {User} from '@supabase/supabase-js';
import {cookies} from 'next/headers';

export const signUpAction = async (prevState: any, formData: FormData) => {
	const origin = headers().get('origin');

	//todo: zod
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const password2 = formData.get('password2') as string;
	const username = formData.get('username');
	if (password !== password2) return 'passwords do not match';

	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

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

	//todo: zod
	if (error) {
		console.error('signup error: ', error);
		return redirect('/error');
	}
	return redirect('/signup/success');
};

export const signInAction = async (formData: FormData) => {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;

	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const {error} = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		// return redirect('/login?message=incorrect email/password. please try again');
		return redirect('/error');
	}
	return redirect(`/`);
};

export const logoutAction = async () => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	await supabase.auth.signOut();
	return redirect('/?message=logout');
};

//returns a user from sessions saved in cookies
//! not for most up-to-date user (use supabase.auth.getUser() instead)
export const old_getUserFromSession = async () => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
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
	const supabase = createClient(cookieStore);
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
