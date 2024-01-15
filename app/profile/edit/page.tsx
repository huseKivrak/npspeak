'use client';
import { ModifyProfile } from '@/utils/users/actions';
import { useFormState } from 'react-dom';
import { SubmitButton } from '@/components/SubmitButton';

const initialState = {
  message: '',
};

export default function EditProfileForm() {
  const [state, formAction] = useFormState(ModifyProfile, initialState);

  return (
    <div>
      <h1>Edit Profile</h1>
      <form action={formAction}>
        <input type='text' name='username' placeholder='username' className='form-control' />
        <input type='text' name='fullName' placeholder='full name' className='form-control' />
        <input type='text' name='website' placeholder='website' className='form-control' />
        <SubmitButton text='save' />
      </form>
      <p aria-live='polite' className='sr-only' role='status'>
        {state?.message}
      </p>
    </div>
  );
}
