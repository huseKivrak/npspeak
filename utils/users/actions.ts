'use server';
import { createClient } from '../supabase/server';
import { cookies } from 'next/headers';
import { db } from '@/database/drizzle';
import { profiles } from '@/database/drizzle/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
export async function ModifyProfile(prevState: any, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.auth.getUser();
  if (data.user === null) {
    redirect('/login');
  }

  const profileFields = ['fullName', 'username', 'website'];
  const updateData: { [key: string]: any } = {};

  for (const [key, val] of formData) {
    if (val && key in profileFields) {
      updateData[key] = val;
    }
  }

  try {
    await db.update(profiles).set(updateData).where(eq(profiles.id, data.user.id));
    return { message: 'Profile updated successfully' };
  } catch (error) {
    return { message: `Error: ${error}` };
  }
}
