'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Checkbox } from '@nextui-org/checkbox';
import ReactSelect from 'react-select';
import { VoiceOptionProps } from '@/types/elevenlabs';
import { VoiceOption } from '../forms/customSelect/VoiceOption';
import { VoiceSingleValue } from '../forms/customSelect/VoiceSingleValue';

export const VoiceSampler = ({
  voiceOptions,
}: {
  voiceOptions: VoiceOptionProps[];
}) => {
  const [ selectedVoiceSampleURL, setSelectedVoiceSampleURL ] = useState<
    string | null
  >(null);
  const [ autoplay, setAutoplay ] = useState(false);

  const { control } = useForm(); //just needed for VoiceSelect props

  return (
    <div className="flex flex-col gap-2 sm:max-w-4xl text-start p-2">

      <p className="text-3xl font-mono">sample some voices:</p>
      <Controller
        name="voice_id"
        control={control}
        rules={{ required: true }}
        render={({ field: { name, ref } }) => (
          <ReactSelect
            name={name}
            ref={ref}
            options={voiceOptions}
            onChange={(value) => {
              setSelectedVoiceSampleURL(value?.sampleURL ?? '');
            }}
            components={{
              Option: VoiceOption,
              SingleValue: VoiceSingleValue,
            }}
            placeholder="select voice"
            isSearchable={false}
            className="text-2xl max-w-sm"
          />
        )}
      />

      <div className="flex mt-2 space-x-4">
        <audio
          src={selectedVoiceSampleURL ?? ''}
          controls
          autoPlay={autoplay}
        />
        <Checkbox
          isSelected={autoplay}
          onValueChange={setAutoplay}
          color="warning"
          radius="sm"
          size="lg"
        >
          Autoplay
        </Checkbox>
      </div>
    </div>
  );
};
