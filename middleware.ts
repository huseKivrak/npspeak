import { NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - signup
     * - login
     * - about
     * - contact
     * - api
     * - _next/static
     * - _next/image
     * - favicon.ico (favicon file)
     * - $ (homepage)
     */
    '/((?!_next/static|_next/image|favicon.ico|$).*)',
  ],
};
