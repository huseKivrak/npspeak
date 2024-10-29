import { getUserProfile } from '@/actions/auth';
import ResetPasswordForm from '@/components/forms/ResetPasswordForm';
import { redirectIfDemoUser } from '@/utils/permissions';
import { redirect } from 'next/navigation';

export default async function ResetPasswordPage() {
  const { user } = await getUserProfile();
  if (!user) {
    return redirect('/login');
  }
  redirectIfDemoUser(user.id, '/campaigns/52', 'demo user cannot reset password.');

  return <ResetPasswordForm />;
}
