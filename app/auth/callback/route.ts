import {createClientOnServer} from '@/utils/supabase/server';
import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');
	const origin = requestUrl.origin;

	if (code) {
		const cookieStore = cookies();
		const supabase = createClientOnServer(cookieStore);
		await supabase.auth.exchangeCodeForSession(code);
	}

	return NextResponse.redirect(`${origin}/dashboard`);
}
