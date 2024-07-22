'use server';

import { createClientOnServer } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { signupSchema, loginSchema } from '@/database/drizzle/validation';
import { ZodError } from 'zod';
import { ActionStatus } from '@/types/drizzle';
import {
  getErrorRedirect,
  getStatusRedirect,
  getURL,
  isValidEmail,
} from '@/utils/helpers/vercel';
import { isExistingEmailAddress } from '@/database/drizzle/queries';
import { db } from '@/database/drizzle';
import { eq } from 'drizzle-orm';
import { profiles } from '@/database/drizzle/schema';
import { Tables } from '@/types/supabase';

export const signUpAction = async (
  prevState: ActionStatus,
  formData: FormData
): Promise<ActionStatus> => {
  const callbackURL = getURL('/auth/confirm');
  let redirectPath: string;

  try {
    const { email, username, password } = signupSchema.parse(formData);
    // const existingEmail = await isExistingEmail(email);

    // if (existingEmail) {
    //   redirectPath = getErrorRedirect(
    //     '/signup',
    //     'Unavailable',
    //     'An account already exists with this email address.'
    //   );
    // }

    const supabase = createClientOnServer();
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: callbackURL,
        data: {
          username,
        },
      },
    });

    if (error) {
      redirectPath = getErrorRedirect(
        '/signup',
        'sign up failed.',
        error.message
      );
    } else if (data.session) {
      redirectPath = getStatusRedirect('/dashboard', 'hey', 'nice to see ya!');
    } else if (
      data.user &&
      data.user.identities &&
      data.user.identities.length === 0
    ) {
      redirectPath = getErrorRedirect(
        '/signup',
        'sign up failed',
        'this email address is taken, please try again'
      );
      console.log('TAKEN EMAIL REDIRECT PATH:', redirectPath);
    } else if (data.user) {
      redirectPath = getStatusRedirect(
        '/signup/success',
        'Success!',
        `Confirmation email sent to ${data.user.email}`
      );
    } else {
      redirectPath = getErrorRedirect(
        '/signup',
        'oops',
        'there was an error during signup'
      );
    }
  } catch (error) {
    if (error instanceof ZodError) {
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
      redirectPath = getErrorRedirect(
        '/signup',
        'oops',
        'there was an error during signup'
      );
    }
  }

  redirect(redirectPath);
};

export const signInAction = async (
  prevState: ActionStatus,
  formData: FormData
): Promise<ActionStatus> => {
  let redirectPath: string;

  try {
    const { email, password } = loginSchema.parse(formData);

    const supabase = createClientOnServer();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      redirectPath = getErrorRedirect(
        '/login',
        'Login failed',
        'Invalid email/password. Please try again.'
      );
    } else {
      redirectPath = getStatusRedirect(
        '/',
        'Login successful',
        'Welcome back!'
      );
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
    } else {
      console.error('Unexpected error:', error);
      redirectPath = getErrorRedirect(
        '/login',
        'Oops',
        'An unexpected error occurred during login.'
      );
    }
  }

  redirect(redirectPath);
};

export const sendResetPasswordEmail = async (email: string) => {
  const callbackURL = getURL('/auth/confirm');

  const validEmail = isValidEmail(email.trim());
  if (!validEmail) {
    return 'Please enter a valid email.';
  }

  try {
    //Check if there's a user with that email
    const existingEmail = await isExistingEmailAddress(email);
    if (!existingEmail) {
      //Handle as "success" to prevent email phishing
      redirect('/forgot-password/success');
    }

    const supabase = createClientOnServer();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: callbackURL,
    });
    if (error) {
      return 'Oops! Something went wrong. Please try again';
    }
  } catch (error) {
    console.error(error);
    return 'Oops! Something went wrong. Please try again';
  }
  redirect('/forgot-password/success');
};

export const updatePasswordAction = async (formData: FormData) => {
  const password = String(formData.get('password')).trim();
  const confirmPassword = String(formData.get('confirm_password')).trim();
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  } else if (password.length < 6) {
    return 'Password must be at least 6 characters.';
  }

  const supabase = createClientOnServer();

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return error.message;

  redirect('/dashboard?message=password-updated');
};

export const signInWithGithub = async () => {
  const origin = headers().get('origin');

  const supabase = createClientOnServer();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${origin}/auth/confirm`,
    },
  });
  if (error) {
    console.error('Sign in with GitHub error:', error);
    redirect('/?message=github-error');
  }

  if (data.url) {
    redirect(data.url);
  }
};

export const signInWithDiscord = async () => {
  const origin = headers().get('origin');

  const supabase = createClientOnServer();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      redirectTo: `${origin}/auth/confirm`,
    },
  });
  if (error) {
    console.error('Sign in with Discord error:', error);
    redirect('/?message=discord-error');
  }
  if (data.url) {
    redirect(data.url);
  }
};

export const logoutAction = async () => {
  const supabase = createClientOnServer();
  let redirectPath: string;

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Logout Error:', error);
    redirectPath = getErrorRedirect(
      '/',
      'Logout failed',
      'An error occurred during logout.'
    );
  } else {
    redirectPath = getStatusRedirect(
      '/',
      'Logout successful',
      'See you next time!'
    );
  }
  redirect(redirectPath);
};

/**
 * Returns the authenticated user's profile,
 * essentially a wrapper around Supabase's auth schema.
 * This is necessary as Supabase's auth schema is read-only.
 */

export type UserProfile = Tables<'profiles'>;
export const getUserProfile = async (): Promise<{
  user: UserProfile | null;
}> => {
  const supabase = createClientOnServer();
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (!user) {
      console.error(`getUserInfo error ${error?.message}`);
      return { user: null };
    }

    const userProfile = await db.query.profiles.findFirst({
      where: eq(profiles.id, user.id),
    });
    return { user: userProfile ? (userProfile as UserProfile) : null };
  } catch (error) {
    console.error('Error:', error);
    return { user: null };
  }
};
