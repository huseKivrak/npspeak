import { type EmailOtpType } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { createClientOnServer } from '@/utils/supabase/server';
import { getErrorRedirect, getStatusRedirect } from '@/utils/helpers/vercel';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/subscribe';
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;

  if (token_hash && type) {
    const supabase = createClientOnServer();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (error) {
      redirectTo.pathname = '/login';
      return NextResponse.redirect(
        getErrorRedirect(
          `${redirectTo}`,
          error.name,
          'Oops! Something went wrong. Please try again.'
        )
      );
    }
  }

  let successMessage = 'email confirmed! ';

  successMessage +=
    type === 'recovery'
      ? 'Create a new password to complete the reset.'
      : 'Get started by making your first NPC';

  // redirect the user to an error page with some instructions
  return NextResponse.redirect(
    getStatusRedirect(`${redirectTo}`, 'Success!', successMessage)
  );
}
