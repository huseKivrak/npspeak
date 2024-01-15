'use client';

import { SubmitButton } from '@/components/SubmitButton';
import { useFormState } from 'react-dom';
import { CreateVoiceClone } from '@/utils/elevenlabs/actions';

const initialState = {
  message: '',
};

export default function CreateClone() {
  const [state, formAction] = useFormState(CreateVoiceClone, initialState);

  return (
    <div className=''>
      <h1>Create A Clone</h1>
      <form action={formAction} className=''>
        <input type='text' name='name' placeholder='name' className='form-control' required />
        <input type='text' name='description' placeholder='description' className='form-control' />
        <input type='file' name='file' accept='audio/*' className='form-control' required />
        <SubmitButton text={'clone me'} className='btn-sm' />
        <p aria-live='polite' className='sr-only' role='status'>
          {state?.message}
        </p>
      </form>
    </div>
  );
}
