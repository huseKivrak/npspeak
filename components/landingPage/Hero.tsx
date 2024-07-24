'use client';

import { Button } from '@nextui-org/button';
import { Divider, Link } from '@nextui-org/react';

export const Hero = () => {
  return (
    <div className="flex flex-col gap-8 max-w-md sm:max-w-6xl">
      <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-alagard tracking-wider">
        npSpeak
      </h1>
      <p className="mt-[-24px] text-warning text-2xl md:text-4xl lg:text-6xl font-bold">
        Give your character a voice.
      </p>
      <div className="flex gap-4 w-full justify-center tracking-widest font-semibold">
        <Link href="/signup">
          <Button
            variant="flat"
            size="lg"
            className="text-large h-16 font-semibold"
            color="success"
          >
            Get started
          </Button>
        </Link>
        <Link href="/about">
          <Button
            variant="flat"
            size="lg"
            className="text-large h-16 font-semibold"
            color="secondary"
          >
            Learn more
          </Button>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Link href="/promo" color="foreground" showAnchorIcon underline="hover">
          Have a promo code?
        </Link>
      </div>
      <Divider className="mt-4" />
    </div>
  );
};
