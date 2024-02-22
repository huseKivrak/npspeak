import {createClient} from '@/utils/supabase/server';
import {NextResponse} from 'next/server';

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');

	if (code) {
		const supabase = createClient();
		await supabase.auth.exchangeCodeForSession(code);
	}

	// URL to redirect to after sign in process completes
	return NextResponse.redirect(requestUrl.origin);
}
