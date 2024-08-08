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

export function VoiceCard({
  voice,
  onSelect,
}: {
  voice: VoiceOptionProps;
  onSelect: (id: string) => void;
}) {
  const { label, value, gender, age, accent, description, useCase, sampleURL } =
    voice;

  return (
    <Card
      radius="sm"
      className={cn(
        'col-span-1 max-w-[450px] w-full h-[150px] bg-success py-4 px-1'
      )}
    >
      <CardHeader className="flex items-center justify-start h-2/5">
        <span className="font-mono font-bold ">{label}</span>
        <Divider
          orientation="vertical"
          className="h-6 w-[1px] bg-white mx-2 self-center"
        />
        <span className="text-xs font-mono text-pretty">
          {`${capitalize(age)} ${capitalize(gender)}, ${capitalize(accent)} accent`}
        </span>
      </CardHeader>

      <CardBody className="flex flex-wrap items-center justify-evenly font-sans pt-0">
        <Chip
          variant="flat"
          size="sm"
          classNames={{
            base: 'bg-danger m-0 p-1',
            content: 'text-white text-xs',
          }}
        >
          {capitalize(accent)}
        </Chip>
        <Chip
          variant="flat"
          size="sm"
          classNames={{
            base: 'bg-primary m-0 p-1',
            content: 'text-white text-xs',
          }}
        >
          {capitalize(description)}
        </Chip>
        <Chip
          variant="flat"
          size="sm"
          classNames={{
            base: 'bg-secondary m-0 p-1',
            content: 'text-white text-xs',
          }}
        >
          {capitalize(useCase)}
        </Chip>
      </CardBody>
      <CardFooter className="flex items-center justify-around py-0 h-1/3 ">
        <AudioButton src={sampleURL} />

        <Button
          variant="light"
          radius="none"
          size="lg"
          endContent={<RiUserVoiceLine className="" />}
          onPress={() => onSelect(value)}
        >
          <span className="font-light">Select</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
