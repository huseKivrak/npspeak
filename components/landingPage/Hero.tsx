'use client';

import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/react';
import { FaArrowRight } from 'react-icons/fa6';


export const Hero = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className=" text-6xl md:text-8xl lg:text-9xl xl:text-10xl font-bold tracking-wider">
        npSpeak
      </h1>

      <h2 className=" font-bold text-warning text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
        Give your character a voice.
      </h2>



      <Link href="/signup" className="w-fit mt-4">
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
    </div>
  );
};
