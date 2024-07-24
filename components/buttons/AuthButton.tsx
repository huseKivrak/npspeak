import Link from 'next/link';
import { logoutAction } from '@/actions/auth';
import { getUserProfile } from '@/actions/auth';

/**
 * Login/logout button depending on user auth state
 */

export default async function AuthButton() {
  const { user } = await getUserProfile();

  return user ? (
    <div className="flex items-center gap-4 ">
      <form action={logoutAction}>
        <button className="text-xl sm:text-4xl">logout</button>
      </form>
    </div>
  ) : (
    <Link href="/login">
      <button className="text-xl sm:text-4xl">login</button>
    </Link>
  );
}
