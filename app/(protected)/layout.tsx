import { getUserProfile } from '@/actions/auth';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getUserProfile();
  if (!user) {
    return redirect('/login');
  }

  return <>{children}</>;
}
