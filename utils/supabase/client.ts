import { createBrowserClient } from '@supabase/ssr';

//essentially createClient + Singleton pattern; avoids creating multiple clients
export const createClientOnClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
