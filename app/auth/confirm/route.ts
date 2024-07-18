import { type EmailOtpType } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { createClientOnServer } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/';
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;

  if (token_hash && type) {
    const supabase = createClientOnServer();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // redirect user to specified redirect URL or root of app
      return NextResponse.redirect(redirectTo);
    }
  }

  // redirect the user to an error page with some instructions
  redirectTo.pathname = '/error';
  return NextResponse.redirect(redirectTo);
}
