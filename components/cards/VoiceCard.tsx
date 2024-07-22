'use client';

import { AudioButton } from '../soundboard/AudioButton';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
} from '@nextui-org/react';
import { VoiceOptionProps } from '@/types/elevenlabs';
import { cn } from '@/utils/helpers/clsxMerge';
import { capitalize } from '@/utils/helpers/formatHelpers';
import { RiUserVoiceLine } from 'react-icons/ri';

export function VoiceCard({ voice }: { voice: VoiceOptionProps }) {
  const { label, value, gender, age, accent, description, useCase, sampleURL } =
    voice;

  return (
    <Card
      radius="sm"
      className={cn(
        'col-span-1 max-w-[450px] w-full h-[150px] bg-success pt-2'
      )}
    >
      <CardHeader className="flex items-center justify-start text-white py-0 h-2/5">
        <span className="font-mono font-bold text-lg md:text-xl lg:text-2xl">
          {label}
        </span>
        <Divider
          orientation="vertical"
          className="h-8 bg-white mx-3 self-center"
        />
        <span className="font-mono text-white leading-tight tracking-tighter text-pretty">
          {`${capitalize(age)} ${capitalize(gender)}, ${capitalize(accent)} accent`}
        </span>
      </CardHeader>
      {/* <Divider className="my-2 w-11/12 self-center" /> */}
      <CardBody className="flex flex-wrap items-center justify-evenly font-sans pt-0">
        <Chip
          variant="flat"
          size="sm"
          classNames={{
            base: 'bg-danger m-0 p-1',
            content: 'text-white text-sm',
          }}
        >
          {capitalize(accent)}
        </Chip>
        <Chip
          variant="flat"
          size="sm"
          classNames={{
            base: 'bg-primary m-0 p-1',
            content: 'text-white text-sm',
          }}
        >
          {capitalize(description)}
        </Chip>
        <Chip
          variant="flat"
          size="sm"
          classNames={{
            base: 'bg-secondary m-0 p-1',
            content: 'text-white text-sm',
          }}
        >
          {capitalize(useCase)}
        </Chip>
      </CardBody>
      <CardFooter className="flex items-center justify-around pt-0 h-1/2">
        <AudioButton src={sampleURL} />

        <Button
          variant="light"
          radius="none"
          size="lg"
          endContent={<RiUserVoiceLine className="" />}
        >
          <span className="font-light text-xl">Select</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
