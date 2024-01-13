import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Prevents unauthenticated Server Component routes
 * by refreshing sessions before loading them
 */
export async function middleware(request: NextRequest) {
  //new response allows header setting
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          //update req/res cookies if cookie is updated
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          //update req/res cookies if cookie is removed
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  //redirect if user is not logged in
  const { data, error } = await supabase.auth.getUser();
  if (data.user === null) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|login).*)'],
};
