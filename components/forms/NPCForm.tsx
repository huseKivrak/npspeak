'use client';

import { useFormState } from 'react-dom';
import { createNPCAction } from '@/database/drizzle/queries';
import { SubmitButton } from '../buttons/SubmitButton';
import ErrorToast from '../ErrorToast';

export default function NPCForm() {
  const [state, formAction] = useFormState(createNPCAction, null);

  return (
    <div>
      <h1>create an NPC</h1>
      <form action={formAction}>
        <input type='text' name='npc_name' placeholder='what are they called?' />
        <input
          type='textarea'
          name='description'
          placeholder='"brave, yet soggy", "think interior of an orc, exterior of a hobbit"'
        />
        <SubmitButton text='create' />
        {state?.zodError && <ErrorToast message={state.message} />}
      </form>
    </div>
  );
}
