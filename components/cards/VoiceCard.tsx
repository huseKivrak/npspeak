'use client';

import { AudioButton } from '../soundboard/AudioButton';
import { Button, Card, CardBody, CardFooter, CardHeader, Chip } from '@nextui-org/react';
import { VoiceOptionProps } from '@/types/elevenlabs';
import { cn } from '@/utils/helpers/clsxMerge';
import { FaCheck, FaPlus } from 'react-icons/fa6';


export function VoiceCard({
  voice,
  onSelect,
  isSelected,
}: {
  voice: VoiceOptionProps;
  onSelect: (id: string) => void;
  isSelected?: boolean;
}) {
  const { label, value, accent, description, sampleURL, summary } = voice;

  return (
    <Card
      shadow="lg"
      className={cn(
        'max-w-[300px] h-[200px] ',
        'transition-transform duration-200 ease-in-out',
        isSelected &&
        'ring-2 ring-warning text-warning-700 shadow-sm transform scale-105'
      )}
    >
      <CardHeader className="flex flex-col items-start gap-2 pb-0">
        <span
          className={cn(
            'font-alagard text-3xl',
            isSelected && 'text-warning'
          )}
        >
          {label.toLowerCase()}
        </span>
        <div className="flex gap-4 font-mono">
          <Chip
            variant="solid"
            color="primary"
            size='sm'
            radius='lg'
            classNames={
              {
                base: 'h-min p-0',
                content: 'text-xs'
              }
            }
          >
            {`${description} `}
          </Chip>
          <Chip
            variant="solid"
            color="secondary"
            size='sm'
            radius='lg'
            classNames={
              {
                base: 'h-min p-0',
                content: 'text-xs'
              }
            }
          >
            {`${accent} `}
          </Chip>
        </div>
      </CardHeader>
      <CardBody className="py-0 px-2 justify-center">
        <p className="text-sm lg:text-base lg:leading-tight text-default-400 lowercase font-mono text-pretty tracking-tight">
          {summary || 'a default voice model'}
        </p>
      </CardBody>
      <CardFooter className='justify-evenly gap-2 h-10 items-center pb-5'>

        <AudioButton
          src={sampleURL}
          variant='flat'
          radius='lg'
          size='sm'
          isIconOnly={false}
        />

        <Button
          fullWidth
          isDisabled={isSelected}
          variant="flat"
          radius="lg"
          size='sm'
          startContent={
            isSelected ? <FaCheck size={24} /> : <FaPlus size={24} />
          }
          onPress={() => onSelect(value)}
          color="success"
        >
          <span className="font-mono text-tiny font-semibold">
            {isSelected ? 'selected' : 'select'}
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}
