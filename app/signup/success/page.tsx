import verifyScroll from '@/public/images/verify_scroll.png';
import Image from 'next/image';
export default function SignupSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">

      <h1 className='text-center'>an email awaits</h1>
      <Image
        src={verifyScroll}
        alt='verify email'
        width={200}
        height={200}
        className='mx-auto'
      />

      <span className="text-xl sm:text-4xl text-balance text-center">
        please verify your email to start using npSpeak
      </span>
    </div>
  );
}
