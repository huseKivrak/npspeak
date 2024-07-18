'use client';
import { useEffect, useMemo, useState } from 'react';
import { getAllVoiceLabelOptions } from '@/utils/elevenlabs/api';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Tooltip,
} from '@nextui-org/react';
import {
  getAccentEmoji,
  voiceMatchesFilter,
} from '@/utils/helpers/formHelpers';
import { capitalize } from '@/utils/helpers/formatHelpers';
import { FaMale, FaFemale } from 'react-icons/fa';
import { MdOutlineDirectionsWalk, MdOutlineElderly } from 'react-icons/md';
import { BiChild } from 'react-icons/bi';
import { VscRefresh } from 'react-icons/vsc';
import { VoiceOptionProps } from '@/types/elevenlabs';

interface FilterState {
  selectedGender: string[];
  selectedAge: string[];
  selectedAccent: string[];
  selectedUseCase: string[];
  selectedDescription: string[];
}

export function VoiceLabelFilter({
  voiceOptions,
  onFilterChange,
}: {
  voiceOptions: VoiceOptionProps[];
  onFilterChange: (filteredOptions: VoiceOptionProps[]) => void;
}) {
  const { gender, age, accent, useCase, description } =
    getAllVoiceLabelOptions(voiceOptions);

  const [filters, setFilters] = useState<FilterState>({
    selectedGender: [],
    selectedAge: [],
    selectedAccent: [],
    selectedUseCase: [],
    selectedDescription: [],
  });
  console.log('voiceOptions:', voiceOptions);

  const handleFilterChange = (
    filterName: keyof FilterState,
    value: string[]
  ) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  const filteredOptions = useMemo(() => {
    return voiceOptions.filter((voice) => {
      return (
        voiceMatchesFilter(filters.selectedGender, voice.gender) &&
        voiceMatchesFilter(filters.selectedAge, voice.age) &&
        voiceMatchesFilter(filters.selectedAccent, voice.accent) &&
        voiceMatchesFilter(filters.selectedUseCase, voice.useCase) &&
        voiceMatchesFilter(filters.selectedDescription, voice.description)
      );
    });
  }, [voiceOptions, filters]);

  const onReset = () => {
    setFilters({
      selectedGender: [],
      selectedAge: [],
      selectedAccent: [],
      selectedUseCase: [],
      selectedDescription: [],
    });
  };

  useEffect(() => {
    console.log('filteredOptions:', filters);
    onFilterChange(filteredOptions);
  }, [filteredOptions, onFilterChange]);

  return (
    <div className="flex flex-col border rounded-3xl border-gray-200 p-4">
      <div className="flex justify-between mb-2">
        <h2 className="text-2xl tracking-wide">Filter voices by...</h2>
        <Tooltip content="Reset filters">
          <Button
            isIconOnly
            type="reset"
            onClick={onReset}
            size="sm"
            radius="full"
            variant="flat"
            className="w-1 h-min p-1"
          >
            <VscRefresh size={18} />
          </Button>
        </Tooltip>
      </div>
      <div className="flex space-x-4">
        <CheckboxGroup
          label="Gender"
          onChange={(values) => handleFilterChange('selectedGender', values)}
          orientation="horizontal"
          size="sm"
          radius="full"
          value={filters.selectedGender}
        >
          <Checkbox key={'male'} value={'male'}>
            <Tooltip content="male">
              <span>
                <FaMale size={24} color="lightblue" />
              </span>
            </Tooltip>
          </Checkbox>
          <Checkbox key={'female'} value={'female'}>
            <Tooltip content="female">
              <span>
                <FaFemale size={24} color="lightpink" />
              </span>
            </Tooltip>
          </Checkbox>
        </CheckboxGroup>

        <Divider orientation="vertical" className="h-10 mt-2 self-center" />

        <CheckboxGroup
          label="Age"
          onChange={(values) => handleFilterChange('selectedAge', values)}
          orientation="horizontal"
          size="sm"
          radius="full"
          value={filters.selectedAge}
        >
          <Checkbox key={'young'} value={'young'}>
            <span>
              <Tooltip content="young">
                <span>
                  <BiChild size={28} className="text-green-200" />
                </span>
              </Tooltip>
            </span>
          </Checkbox>
          <Checkbox key={'middle-aged'} value={'middle-aged'}>
            <span>
              <Tooltip content="middle-aged">
                <span>
                  <MdOutlineDirectionsWalk
                    size={28}
                    className="text-green-300"
                  />
                </span>
              </Tooltip>
            </span>
          </Checkbox>
          <Checkbox key={'old'} value={'old'}>
            <span>
              <Tooltip content="old">
                <span>
                  <MdOutlineElderly size={28} className="text-green-500" />
                </span>
              </Tooltip>
            </span>
          </Checkbox>
        </CheckboxGroup>

        <Divider orientation="vertical" className="h-10 mt-2 self-center" />

        <CheckboxGroup
          label="Accent"
          onChange={(values) => handleFilterChange('selectedAccent', values)}
          orientation="horizontal"
          size="sm"
          radius="full"
          value={filters.selectedAccent}
        >
          {accent.map((accent) => (
            <Checkbox key={accent} value={accent}>
              <Tooltip content={accent}>
                <span className="text-3xl">{getAccentEmoji(accent)}</span>
              </Tooltip>
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>

      <Divider className="my-2" />

      <CheckboxGroup
        label="Use Case"
        onChange={(values) => handleFilterChange('selectedUseCase', values)}
        orientation="horizontal"
        size="sm"
        radius="full"
        value={filters.selectedUseCase}
      >
        {useCase.sort().map((useCase) => (
          <Checkbox key={useCase} value={useCase}>
            {capitalize(useCase)}
          </Checkbox>
        ))}
      </CheckboxGroup>

      <Divider className="my-2" />

      <CheckboxGroup
        label="Description"
        onChange={(values) => handleFilterChange('selectedDescription', values)}
        orientation="horizontal"
        size="sm"
        radius="full"
        value={filters.selectedDescription}
      >
        {description.sort().map((description) => (
          <Checkbox key={description} value={description}>
            {capitalize(description)}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
}
