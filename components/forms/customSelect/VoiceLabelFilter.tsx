'use client';
import { useEffect, useMemo, useState } from 'react';
import { getAllVoiceLabelOptions } from '@/utils/elevenlabs/api';
import {
  Autocomplete,
  AutocompleteItem,
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
    <div className="flex flex-col max-w-[265px] h-fit border rounded-2xl border-gray-200 px-4 py-2">
      <div className="flex justify-between mb-2">
        <h2 className="text-xl tracking-wide">Filter voices by...</h2>

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
      <div className="flex flex-col ">
        <div className="flex items-center justify-between">
          <CheckboxGroup
            onChange={(values) => handleFilterChange('selectedGender', values)}
            orientation="horizontal"
            size="sm"
            radius="full"
            value={filters.selectedGender}
          >
            <Checkbox key={'male'} value={'male'} className="">
              <Tooltip content="male" placement="bottom-end">
                <span>
                  <FaMale size={20} color="lightblue" className="-ml-1" />
                </span>
              </Tooltip>
            </Checkbox>
            <Checkbox key={'female'} value={'female'}>
              <Tooltip content="female" placement="bottom">
                <span>
                  <FaFemale size={20} color="lightpink" className="-ml-1" />
                </span>
              </Tooltip>
            </Checkbox>
          </CheckboxGroup>

          <Divider orientation="vertical" className="self-center h-5" />

          <CheckboxGroup
            onChange={(values) => handleFilterChange('selectedAge', values)}
            orientation="horizontal"
            size="sm"
            radius="full"
            value={filters.selectedAge}
          >
            <Checkbox key={'young'} value={'young'}>
              <span>
                <Tooltip content="young" placement="bottom">
                  <span>
                    <BiChild size={20} className="-ml-1 text-green-200" />
                  </span>
                </Tooltip>
              </span>
            </Checkbox>
            <Checkbox key={'middle-aged'} value={'middle-aged'}>
              <span>
                <Tooltip content="middle-aged" placement="bottom">
                  <span>
                    <MdOutlineDirectionsWalk
                      size={20}
                      className="-ml-1 text-green-400"
                    />
                  </span>
                </Tooltip>
              </span>
            </Checkbox>
            <Checkbox key={'old'} value={'old'}>
              <span>
                <Tooltip content="old" placement="bottom-start">
                  <span>
                    <MdOutlineElderly
                      size={20}
                      className="-ml-1 text-green-600"
                    />
                  </span>
                </Tooltip>
              </span>
            </Checkbox>
          </CheckboxGroup>
        </div>

        <Divider className="my-4 self-center" />

        <CheckboxGroup
          onChange={(values) => handleFilterChange('selectedAccent', values)}
          orientation="horizontal"
          size="sm"
          radius="full"
          value={filters.selectedAccent}
          classNames={{
            base: '',
          }}
        >
          {accent.map((accent) => (
            <Tooltip content={accent}>
              <Checkbox key={accent} value={accent} aria-label={accent}>
                <span className="-ml-1 mr-1">
                  {getAccentEmoji(accent.toLowerCase())}
                </span>
              </Checkbox>
            </Tooltip>
          ))}
        </CheckboxGroup>
      </div>

      <Divider className="my-4" />

      <CheckboxGroup
        onChange={(values) => handleFilterChange('selectedUseCase', values)}
        orientation="horizontal"
        size="sm"
        radius="full"
        value={filters.selectedUseCase}
      >
        {useCase.sort().map((useCase) => (
          <Checkbox key={useCase} value={useCase}>
            <span className="-ml-1 mr-1 tracking-tight">
              {capitalize(useCase)}
            </span>
          </Checkbox>
        ))}
      </CheckboxGroup>

      <Divider className="my-4" />

      <CheckboxGroup
        onChange={(values) => handleFilterChange('selectedDescription', values)}
        orientation="horizontal"
        size="sm"
        radius="full"
        value={filters.selectedDescription}
      >
        {description.sort().map((description) => (
          <Checkbox key={description} value={description}>
            <span className="-ml-1 mr-1 tracking-tight">
              {capitalize(description)}
            </span>
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
}
