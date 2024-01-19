'use client';
import { useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { SubmitButton } from '@/components/SubmitButton';
import { recoverPassword } from '@/utils/users/actions';
export default function ResetPassword() {
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == 'PASSWORD_RECOVERY') {
        const newPassword = prompt('What would you like your new password to be?');
        if (!newPassword) return;
        const { data, error } = await supabase.auth.updateUser({ password: newPassword });

        if (data) alert('Password updated successfully!');
        if (error) alert('There was an error updating your password.');
      }
    });
  }, []);
  return (
    <div>
      <h1>Reset Password</h1>
      <form action={recoverPassword} className=''>
        <input type='email' name='email' placeholder='email' className='form-control' />
        <SubmitButton text='reset password' />
      </form>
    </div>
  );
}
