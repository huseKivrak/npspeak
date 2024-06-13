'use client';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { getAllVoiceLabelOptions } from '@/utils/elevenlabs/api';
import { Button, Checkbox, CheckboxGroup } from '@nextui-org/react';
import { VoiceOptionProps } from '@/utils/helpers/formHelpers';
import { capitalize } from '@/utils/formatHelpers';

interface FilterState {
  selectedGender: string[];
  selectedAge: string[];
  selectedAccent: string[];
  selectedUseCase: string[];
  selectedDescription: string[];
}

export function VoiceFilterForm({
  voiceOptions,
  onFilterSubmit,
}: {
  voiceOptions: VoiceOptionProps[];
  onFilterSubmit: (filteredOptions: VoiceOptionProps[]) => void;
}) {
  const [filters, setFilters] = useState<FilterState>({
    selectedGender: [],
    selectedAge: [],
    selectedAccent: [],
    selectedUseCase: [],
    selectedDescription: [],
  });
  console.log('voiceOptions:', voiceOptions);
  const { handleSubmit, control, reset } = useForm();

  const { gender, age, accent, useCase, description } =
    getAllVoiceLabelOptions(voiceOptions);

  const onReset = () => {
    reset();
    setFilters({
      selectedGender: [],
      selectedAge: [],
      selectedAccent: [],
      selectedUseCase: [],
      selectedDescription: [],
    });
  };

  const handleFilterChange = (
    filterName: keyof FilterState,
    value: string[]
  ) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  const onSubmit = (data: any) => {
    console.log('Selected Options:', data);
    console.log('Filters:', filters);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Button type="reset" onClick={onReset}>
        Reset
      </Button>
      <Controller
        control={control}
        name="gender"
        render={({ field: { ref } }) => (
          <CheckboxGroup
            ref={ref}
            label="gender"
            onChange={(values) => handleFilterChange('selectedGender', values)}
            orientation="horizontal"
          >
            <Checkbox key={'male'} value={'male'}>
              Male
            </Checkbox>
            <Checkbox key={'female'} value={'female'}>
              Female
            </Checkbox>
          </CheckboxGroup>
        )}
      />
      <Controller
        control={control}
        name="age"
        render={({ field: { ref } }) => (
          <CheckboxGroup
            ref={ref}
            label="age"
            onChange={(values) => handleFilterChange('selectedAge', values)}
            orientation="horizontal"
          >
            <Checkbox key={'young'} value={'young'}>
              Young
            </Checkbox>
            <Checkbox key={'middle-aged'} value={'middle-aged'}>
              Middle-aged
            </Checkbox>
            <Checkbox key={'old'} value={'old'}>
              Old
            </Checkbox>
          </CheckboxGroup>
        )}
      />
      <Controller
        control={control}
        name="accent"
        render={({ field: { ref } }) => (
          <CheckboxGroup
            ref={ref}
            label="accent"
            onChange={(values) => handleFilterChange('selectedAccent', values)}
            orientation="horizontal"
          >
            {accent.map((accent) => (
              <Checkbox key={accent} value={accent}>
                {capitalize(accent)}
              </Checkbox>
            ))}
          </CheckboxGroup>
        )}
      />
      <Controller
        control={control}
        name="useCase"
        render={({ field: { ref } }) => (
          <CheckboxGroup
            ref={ref}
            label="Use Case"
            onChange={(values) => handleFilterChange('selectedUseCase', values)}
            orientation="horizontal"
          >
            {useCase.map((useCase) => (
              <Checkbox key={useCase} value={useCase}>
                {capitalize(useCase)}
              </Checkbox>
            ))}
          </CheckboxGroup>
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { ref } }) => (
          <CheckboxGroup
            ref={ref}
            label="description"
            onChange={(values) =>
              handleFilterChange('selectedDescription', values)
            }
            orientation="horizontal"
          >
            {description.map((description) => (
              <Checkbox key={description} value={description}>
                {capitalize(description)}
              </Checkbox>
            ))}
          </CheckboxGroup>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
