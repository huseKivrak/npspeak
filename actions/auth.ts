'use server';

import {createClient} from '@/utils/supabase/server';
import {headers} from 'next/headers';
import {redirect} from 'next/navigation';

import {User} from '@supabase/supabase-js';

export const signUpAction = async (prevState: any, formData: FormData) => {
	const origin = headers().get('origin');
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const password2 = formData.get('password2') as string;
	const username = formData.get('username');

	//todo: zod
	if (password !== password2) return 'passwords do not match';

	const supabase = createClient();
	const {error} = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				username,
			},
			emailRedirectTo: `${origin}/auth/callback`,
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
	const supabase = createClient();

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
	const supabase = createClient();
	await supabase.auth.signOut();
	return redirect('/?message=logout');
};

//returns a user from sessions saved in cookies
//! not for most up-to-date user (use supabase.auth.getUser() instead)
export const getUserFromSession = async () => {
	const supabase = createClient();
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
export const getUsername = async (user?: User) => {
	if (user) return user.user_metadata.username;

	const sessionUser = await getUserFromSession();
	return sessionUser?.user_metadata.username;
};
