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
    <div>
      <h1>Create A Clone</h1>
      <form action={formAction}>
        <input type='text' name='name' placeholder='Name' required />
        <input type='text' name='description' placeholder='Description' />
        <input type='file' name='file' accept='audio/*' required />
        <SubmitButton text={'clone me'}/>
        <p aria-live='polite' className='sr-only' role='status'>
          {state?.message}
        </p>
      </form>
    </div>
  );
}
