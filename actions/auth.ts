'use server';

import { createClientOnServer } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { signupSchema, loginSchema } from '@/database/drizzle/validation';
import { ZodError } from 'zod';
import { ActionStatus } from '@/types/types';
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
import { applyPromoCodeToUser } from './db/promo';

export const signUpAction = async (
  prevState: ActionStatus,
  formData: FormData
): Promise<ActionStatus> => {
  const callbackURL = getURL('/auth/confirm');
  let redirectPath: string;

  try {
    const { email, username, password, promo_code } =
      signupSchema.parse(formData);
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
    } else if (data.user) {
      //update the user's profile if they used a promo code
      if (promo_code) {
        const { error } = await applyPromoCodeToUser(promo_code, data.user.id);
        if (error) {
          console.error('Error applying promo code to user:', error);
          redirectPath = getErrorRedirect(
            '/signup',
            'oops',
            'there was an error applying your promo code'
          );
        } else {
          redirectPath = getStatusRedirect(
            '/signup/success',
            'Success!',
            `Confirmation email sent to ${data.user.email}`
          );
        }
      } else {
        redirectPath = getStatusRedirect(
          '/signup/success',
          'Success!',
          `Confirmation email sent to ${data.user.email}`
        );
      }
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
        '/dashboard',
        'logged in',
        'welcome back!'
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
        'oops',
        'an unexpected error occurred during login'
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
      return 'No account found with that email address.';
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

  const redirectPath = getStatusRedirect(
    '/forgot-password',
    'success',
    'a reset link has been sent to your email'
  );
  redirect(redirectPath);
};

export const updatePasswordAction = async (formData: FormData) => {
  const password = String(formData.get('password')).trim();
  const confirmPassword = String(formData.get('confirm_password')).trim();
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  } else if (password.length < 6) {
    return 'Password must be at least 6 characters.';
  }

  let redirectPath: string;
  const supabase = createClientOnServer();

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    console.error('Error updating password:', error);
    redirectPath = getErrorRedirect(
      '/reset-password',
      'oops',
      'an unexpected error occurred during password reset'
    );
  }

  redirectPath = getStatusRedirect(
    '/dashboard',
    'success',
    'your password has been updated'
  );
  redirect(redirectPath);
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
      'logout failed',
      'an unexpected error occurred during logout'
    );
  } else {
    redirectPath = getStatusRedirect('/', 'logged out', 'see ya next time!');
  }
  redirect(redirectPath);
};

/**
 * Returns the authenticated user's profile,
 * essentially a wrapper around Supabase's auth schema.
 * Necessary for Supabase's read-only auth schema.
 */

export type UserProfile = Tables<'profiles'>;
export const getUserProfile = async (): Promise<{
  user: UserProfile | null;
}> => {
  const supabase = createClientOnServer();
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (!user) {
      console.warn('No user:', authError?.message);
      return { user: null };
    } else if (authError) {
      console.error('Supabase getUser error:', authError.message);
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
