import Link from 'next/link';

export default function Hero() {
  return (
    <div className='hero bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-5xl'>npSpeak</h1>
          <p className='py-6'>
            Ullamco anim irure incididunt sunt et culpa et id veniam. Cillum id velit irure ullamco
            nulla culpa sint cillum amet deserunt. Nulla reprehenderit laborum dolor voluptate ipsum
            laborum exercitation. Culpa consectetur ipsum deserunt id excepteur fugiat consequat
            mollit culpa officia anim laboris sunt cillum. Ut quis reprehenderit et occaecat
            excepteur minim Lorem laborum non dolor nisi ullamco. Officia duis incididunt non et
            deserunt cillum ipsum ut.
          </p>
          <Link href='/signup' className='btn btn-outline btn-primary tracking-widest font-light'>
            get started
          </Link>
        </div>
      </div>
    </div>
  );
}
