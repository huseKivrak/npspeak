import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const unprotectedPaths = [
    '/signup',
    '/login',
    '/about',
    '/contact',
    '/api',
    '/auth',
    '/forgot-password',
    '/promo',
  ];
  const isUnprotectedPath = unprotectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (user && !isUnprotectedPath) {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', user.id)
      .single();

    if (!subscription || subscription.status !== 'active') {
      const url = request.nextUrl.clone();
      url.pathname = '/subscribe';
      return NextResponse.redirect(url);
    }
  } else if (!user && !isUnprotectedPath) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
