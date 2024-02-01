'use server';

import { cookies } from 'next/headers';
import { createClient } from './default/server';
import { User } from '@supabase/supabase-js';

//returns a user from sessions saved in cookies
//! not for most up-to-date user (use supabase.auth.getUser() instead)
export const getUserFromSession = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session?.user;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

//simple helper for getting nested username for now
export const getUsername = (user?: User) => user?.user_metadata.username;
