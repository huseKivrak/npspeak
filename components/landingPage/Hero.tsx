'use client';

import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/react';
import { FaArrowRight } from 'react-icons/fa6';


export const Hero = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className=" text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider">
        npSpeak
      </h1>

      <h2 className=" font-bold text-warning text-2xl md:text-4xl lg:text-5xl">
        Give your character a voice.
      </h2>



      <Link href="/signup">
        <Button
          variant="flat"
          className=" md:h-14 md:text-2xl"
          color="success"
          size="lg"
          endContent={<FaArrowRight />}
        >
          Get Started
        </Button>
      </Link>


      <div className='flex flex-col'>
        <h2>AI-powered voice synthesis</h2>
        <p className='max-w-xl'>
          Est aliqua magna eiusmod est.
          Magna eiusmod est excepteur voluptate et.
          Est, excepteur voluptate et aliquip amet aliquip.
          Et, aliquip amet aliquip.
          Amet, enim voluptate eiusmod.
        </p>

        <h2>
          everything you need.
          <br />
          nothing you don&apos;t.
        </h2>
        <p className='max-w-xl'>

        </p>

        <h2></h2>
      </div>
    </div>
  );
};
