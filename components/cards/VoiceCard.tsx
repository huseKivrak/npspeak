'use client';

import { AudioButton } from '../soundboard/AudioButton';
import { Button, Card, CardBody, CardHeader, Chip } from '@nextui-org/react';
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
  const { label, value, accent, description, sampleURL, useCase } = voice;

  return (
    <Card
      shadow="lg"
      className={cn(
        'max-w-[400px] w-full p-2',
        'transition-all duration-200 ease-in-out',
        isSelected &&
          'ring-2 ring-warning-700 text-warning-700 shadow-sm transform scale-[1.05]'
      )}
    >
      <CardHeader className="flex flex-col items-start gap-2">
        <span
          className={cn(
            'font-alagard text-4xl tracking-widest',
            isSelected && ''
          )}
        >
          {label.toLowerCase()}
        </span>
        <div className="flex justify-between w-full gap-2">
          <Chip variant="faded" color="primary">{`${description} `}</Chip>
          <Chip variant="faded" color="danger">{`${accent} `}</Chip>
          <Chip variant="faded" color="secondary">{`${useCase} `}</Chip>
        </div>
      </CardHeader>

      <CardBody className="flex-row space-x-2">
        <AudioButton src={sampleURL} label="sample" />

        <Button
          isDisabled={isSelected}
          variant="bordered"
          radius="none"
          startContent={
            isSelected ? <FaCheck size={24} /> : <FaPlus size={24} />
          }
          onPress={() => onSelect(value)}
          fullWidth
          color="success"
        >
          <span className="font-mono text-tiny">
            {isSelected ? 'selected' : 'select'}
          </span>
        </Button>
      </CardBody>
    </Card>
  );
}
