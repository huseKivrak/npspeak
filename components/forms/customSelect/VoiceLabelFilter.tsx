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
    onFilterChange(filteredOptions);
  }, [filteredOptions, onFilterChange]);

  return (
    <div className="flex flex-col max-w-[265px] h-fit border rounded-xl border-gray-200 px-2 md:px-4 py-2">
      <Tooltip content="clear filters" size="sm">
        <Button
          isIconOnly
          type="reset"
          onClick={onReset}
          size="sm"
          radius="full"
          variant="flat"
          color="danger"
          className="self-end -mr-2 -mb-3 h-min py-1"
        >
          <VscRefresh size={16} />
        </Button>
      </Tooltip>

      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold mb-1">gender</span>
            <CheckboxGroup
              onChange={(values) =>
                handleFilterChange('selectedGender', values)
              }
              orientation="horizontal"
              size="sm"
              radius="full"
              value={filters.selectedGender}
            >
              <Checkbox
                key={'male'}
                value={'male'}
                classNames={{
                  wrapper: 'w-3 h-3',
                  icon: 'w-2 h-1',
                }}
              >
                <Tooltip content="male" placement="bottom-end" size="sm">
                  <span>
                    <FaMale size={16} color="lightblue" className="-ml-1" />
                  </span>
                </Tooltip>
              </Checkbox>
              <Checkbox
                key={'female'}
                value={'female'}
                classNames={{
                  wrapper: 'w-3 h-3',
                  icon: 'w-2 h-1',
                }}
              >
                <Tooltip content="female" placement="bottom" size="sm">
                  <span>
                    <FaFemale size={16} color="lightpink" className="-ml-1" />
                  </span>
                </Tooltip>
              </Checkbox>
            </CheckboxGroup>
          </div>
          <Divider orientation="vertical" className="w-[0.5px] h-8 mx-0 mt-4" />
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold mb-1">age</span>
            <CheckboxGroup
              onChange={(values) => handleFilterChange('selectedAge', values)}
              orientation="horizontal"
              size="sm"
              radius="full"
              value={filters.selectedAge}
            >
              <Checkbox
                key={'young'}
                value={'young'}
                classNames={{
                  wrapper: 'w-3 h-3',
                  icon: 'w-2 h-1',
                }}
              >
                <span>
                  <Tooltip content="young" placement="bottom" size="sm">
                    <span>
                      <BiChild size={18} className="-ml-1 text-green-200" />
                    </span>
                  </Tooltip>
                </span>
              </Checkbox>
              <Checkbox
                key={'middle-aged'}
                value={'middle-aged'}
                classNames={{
                  wrapper: 'w-3 h-3',
                  icon: 'w-2 h-1',
                }}
              >
                <span>
                  <Tooltip content="middle-aged" placement="bottom" size="sm">
                    <span>
                      <MdOutlineDirectionsWalk
                        size={18}
                        className="-ml-1 text-green-400"
                      />
                    </span>
                  </Tooltip>
                </span>
              </Checkbox>
              <Checkbox
                key={'old'}
                value={'old'}
                classNames={{
                  wrapper: 'w-3 h-3',
                  icon: 'w-2 h-1',
                }}
              >
                <span>
                  <Tooltip content="old" placement="bottom-start" size="sm">
                    <span>
                      <MdOutlineElderly
                        size={18}
                        className="-ml-1 text-green-600"
                      />
                    </span>
                  </Tooltip>
                </span>
              </Checkbox>
            </CheckboxGroup>
          </div>
        </div>

        <span className="mt-4 font-mono text-xs font-bold">accent</span>

        <Divider className="mb-2 h-[0.5px]" />

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
            <Tooltip content={accent} key={accent} size="sm">
              <Checkbox
                value={accent}
                aria-label={accent}
                classNames={{
                  base: 'py-1.5',
                  wrapper: 'w-3 h-3 ',
                  icon: 'w-2 h-1 ',
                }}
              >
                <span className="-ml-1 mr-1 text-tiny">
                  {getAccentEmoji(accent.toLowerCase())}
                </span>
              </Checkbox>
            </Tooltip>
          ))}
        </CheckboxGroup>
      </div>

      <span className="mt-3 font-mono text-xs font-bold">use case</span>
      <Divider className="mb-2 h-[0.5px]" />
      <CheckboxGroup
        onChange={(values) => handleFilterChange('selectedUseCase', values)}
        orientation="horizontal"
        size="sm"
        radius="full"
        value={filters.selectedUseCase}
      >
        {useCase.sort().map((useCase) => (
          <Checkbox
            key={useCase}
            value={useCase}
            classNames={{
              base: 'py-1.5',
              wrapper: 'w-3 h-3',
              icon: 'w-2 h-1',
            }}
          >
            <span className="-ml-1 mr-1 text-sm">{capitalize(useCase)}</span>
          </Checkbox>
        ))}
      </CheckboxGroup>

      <span className="mt-3 font-mono text-xs font-bold">description</span>
      <Divider className="mb-2 h-[0.5px]" />

      <CheckboxGroup
        onChange={(values) => handleFilterChange('selectedDescription', values)}
        orientation="horizontal"
        size="sm"
        radius="full"
        value={filters.selectedDescription}
      >
        {description.sort().map((description) => (
          <Checkbox
            key={description}
            value={description}
            classNames={{
              base: 'py-1.5',
              wrapper: 'w-3 h-3',
              icon: 'w-2 h-1',
            }}
          >
            <span className="-ml-1 mr-1 text-sm">
              {capitalize(description)}
            </span>
          </Checkbox>
        ))}
      </CheckboxGroup>
    </div>
  );
}
