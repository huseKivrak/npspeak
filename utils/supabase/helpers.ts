import { cookies } from 'next/headers';
import { createClient } from './default/server';

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
