import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Prevents unauthenticated Server Component routes
 * by refreshing sessions before loading them
 */
export async function middleware(request: NextRequest) {

  //attempt at not rendering AuthButton on login
  const url = new URL(request.url);
  const origin = url.origin;
  const pathname = url.pathname;


  const requestHeaders = new Headers(request.headers);
  // if (pathname === '/login') {
  //   requestHeaders.set('x-login', 'true');
  // }

  //new response allows header setting
  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
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
  //todo: getSession() might suffice here (instead of database lookups each time)
  const { data, error } = await supabase.auth.getUser();
  if (data.user === null) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|login|signup).*)'],
};
