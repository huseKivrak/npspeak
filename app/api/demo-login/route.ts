import { createClientOnServer } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { getStatusRedirect, getErrorRedirect } from '@/utils/helpers/vercel';

/**
 * This route uses a GET request (i.e. not POST) to facilitate quick, one-click
 * demo access from a shared URL.
 *
 * While exposed, the token used is a secure, unguessable value that provides
 * access to a demo account with limited permissions.
 *
 * - Validates the `access_token` from the request URL query parameters
 * against the token stored as an environment variable.
 *  - If **valid**, the demo user is signed in with stored credentials
 * and redirected to the demo campaign page.
 *  - If **invalid or missing**, the user is redirected to the
 * homepage with an error message.
 */
export async function GET(request: Request) {
  const supabase = createClientOnServer();
  const url = new URL(request.url);
  const urlToken = url.searchParams.get('access_token');
  const demoToken = process.env.DEMO_TOKEN!;
  const demoEmail = process.env.DEMO_EMAIL!;
  const demoPassword = process.env.DEMO_PASSWORD!;

  let redirectPath: string;

  //early return if token is invalid/missing
  if (!urlToken || urlToken !== demoToken) {
    console.warn('invalid or missing demo token');
    const unauthorizedRedirectPath = getErrorRedirect(
      '/',
      'demo login failed',
      'unauthorized to access demo account.'
    );
    const unauthorizedRedirectURL = new URL(
      unauthorizedRedirectPath,
      request.url
    );
    return NextResponse.redirect(unauthorizedRedirectURL);
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: demoEmail,
    password: demoPassword,
  });

  if (error) {
    console.error('error siging in as demo user:', error);

    redirectPath = getErrorRedirect(
      '/',
      'demo login failed',
      'unable to sign in as demo user.'
    );
  } else {
    redirectPath = getStatusRedirect(
      '/campaigns/52',
      'logged in as demo user',
      'thanks for trying npSpeak!'
    );
  }

  const redirectURL = new URL(redirectPath, request.url);
  return NextResponse.redirect(redirectURL);
}
