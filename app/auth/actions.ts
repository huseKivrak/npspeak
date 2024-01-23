'use server';

import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const signUpAction= async (prevState: any, formData: FormData) => {
  const origin = headers().get('origin');
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const password2 = formData.get('password2') as string;

  //todo: better validation
  if (password !== password2) return 'passwords do not match';
    //# optional username added as metadata. defaults to email.
  const username =
    formData.get('username') !== null ? (formData.get('username') as string) : (email as string);
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  console.log('username: ', username);
  const { data, error } = await supabase.auth.signUp({
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
    console.error('signup error: ', error);
    return redirect('/signup?oops, something went wrong. please try again');
  }

  return redirect('/signup?message=account created! check your email to confirm');
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // return redirect('/login?message=incorrect email/password. please try again');
    return 'incorrect email/password. please try again';
  }

  console.log('data.user: ', data.user);
  const username = data.user.user_metadata.username;

  return redirect(`/`);
};

// export async function ModifyProfile(prevState: any, formData: FormData) {
//   const cookieStore = cookies();
//   const supabase = createClient(cookieStore);

//   const { data } = await supabase.auth.getUser();
//   if (data.user === null) {
//     redirect('/login');
//   }

//   const profileFields = ['fullName', 'username', 'website'];
//   const updateData: { [key: string]: any } = {};

//   for (const [key, val] of formData) {
//     if (val && key in profileFields) {
//       updateData[key] = val;
//     }
//   }

//   try {
//     await db.update(profiles).set(updateData).where(eq(profiles.id, data.user.id));
//     return { message: 'Profile updated successfully' };
//   } catch (error) {
//     return { message: `Error: ${error}` };
//   }
// }

// //todo: finish
// export const recoverPassword = async (prevState:any, formData: FormData) => {
//   const email = formData.get('email') as string;
//   const cookieStore = cookies();
//   const supabase = createClient(cookieStore);
//   const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
//     redirectTo:'/login/reset-password'
//   });
// };
