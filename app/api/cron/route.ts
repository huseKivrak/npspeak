import { syncVoices } from '@/jobs/syncVoices';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { CRON_ACTION_SECRET } = process.env;
  if (!CRON_ACTION_SECRET) {
    return new Response('CRON_ACTION_SECRET is not set', {
      status: 500,
    });
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${CRON_ACTION_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const response = await syncVoices();
  return NextResponse.json(response);
}
