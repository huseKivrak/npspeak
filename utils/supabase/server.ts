import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

//generalized cookie reading/writing
export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },

        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.error(error);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            console.error(error);
          }
        },
      },
    }
  );
};

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
