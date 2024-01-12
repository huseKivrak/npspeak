import { CreateVoiceClone } from '@/utils/elevenlabs/actions';

export default function CreateClone() {
  return (
    <div>
      <h1>Create A Clone</h1>
      <form action={CreateVoiceClone}>
        <input type='text' name='name' placeholder='Name' required />
        <input type='text' name='description' placeholder='Description' />
        <input type='file' name='file' accept='audio/*' required />
        <button type='submit'>clone me</button>
      </form>
    </div>
  );
}
