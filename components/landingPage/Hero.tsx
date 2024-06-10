import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/react';
import Link from 'next/link';

export const Hero = () => {
  return (
    <div className="flex flex-col gap-8 ">
      <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-alagard  tracking-wider">
        npSpeak
      </h1>
      <p className="mt-[-24px] text-3xl md:text-5xl lg:text-6xl  font-bold">
        Give your character a voice.
      </p>
      <div className="flex gap-4 w-full justify-center tracking-widest font-semibold">
        <Link href="/signup">
          <Button
            variant="flat"
            size="lg"
            radius="sm"
            className="text-large h-16 font-semibold"
            color="primary"
          >
            Get started
          </Button>
        </Link>
        <Link href="/about">
          <Button
            variant="flat"
            size="lg"
            radius="sm"
            className="text-large h-16 font-semibold"
            color="primary"
          >
            Learn more
          </Button>
        </Link>
      </div>
      <Divider className="mt-4" />
    </div>
  );
};
