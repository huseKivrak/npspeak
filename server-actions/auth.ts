'use server';

import {createClient} from '@/utils/supabase/defaults/server';
import {headers} from 'next/headers';
import {cookies} from 'next/headers';
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

	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const {data, error} = await supabase.auth.signUp({
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
		return redirect('/signup?oops, something went wrong. please try again');
	}

	return redirect('/signup/success');
};

export const signInAction = async (formData: FormData) => {
	const email = formData.get('email') as string;
	const password = formData.get('password') as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const {data, error} = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		// return redirect('/login?message=incorrect email/password. please try again');
		return 'incorrect email/password. please try again';
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
export const getUserFromSession = async () => {
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

//simple helper for getting nested username for now
//todo: integrate profiles table in lieu of auth
//'db.select(username).from(profiles).where(eq(profiles.id, user.id))'
export const getUsername = (user: User) => user.user_metadata.username;
