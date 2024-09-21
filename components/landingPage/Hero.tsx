'use client';

import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/react';
import { FaArrowRight } from 'react-icons/fa6';

export const Hero = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="fadeInFirst text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider">
        npSpeak
      </h1>

      <p className="fadeInSecond font-bold text-warning text-2xl md:text-4xl lg:text-5xl">
        Give your character a voice.
      </p>

      <Link href="/signup">
        <Button
          variant="flat"
          className="fadeInThirdUp md:h-14 md:text-xl"
          color="success"
          endContent={<FaArrowRight />}
        >
          Get Started
        </Button>
      </Link>
    </div>
  );
};
