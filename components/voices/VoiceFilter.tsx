'use client';

import { useEffect, useMemo, useState } from 'react';
import { getAllVoiceLabelOptions } from '@/utils/elevenlabs/api';
import {
  Button,
  Tooltip,
  Select,
  SelectItem,
  Selection,
  Chip,
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
  selectedGender: Selection;
  selectedAge: Selection;
  selectedAccent: Selection;
  selectedUseCase: Selection;
  selectedDescription: Selection;
}

export function VoiceFilter({
  voiceOptions,
  onFilterChange,
}: {
  voiceOptions: VoiceOptionProps[];
  onFilterChange: (filteredOptions: VoiceOptionProps[]) => void;
}) {
  const { accent, useCase, description } =
    getAllVoiceLabelOptions(voiceOptions);

  const [filters, setFilters] = useState<FilterState>({
    selectedGender: new Set([]),
    selectedAge: new Set([]),
    selectedAccent: new Set([]),
    selectedUseCase: new Set([]),
    selectedDescription: new Set([]),
  });

  const handleSelectionChange =
    (filterName: keyof FilterState) =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: new Set(e.target.value.split(',')),
      }));
    };

  const handleChipClose = (filterName: keyof FilterState, value: string) => {
    setFilters((prevFilters) => {
      const newSet = new Set(prevFilters[filterName]);
      newSet.delete(value);
      return {
        ...prevFilters,
        [filterName]: newSet,
      };
    });
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
      selectedGender: new Set([]),
      selectedAge: new Set([]),
      selectedAccent: new Set([]),
      selectedUseCase: new Set([]),
      selectedDescription: new Set([]),
    });
    onFilterChange(voiceOptions);
  };

  useEffect(() => {
    onFilterChange(filteredOptions);
  }, [filteredOptions, onFilterChange]);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-8 justify-end">
        <span className="text-tiny md:text-medium font-alagard ">
          <span className="text-warning">{`${filteredOptions.length}`}</span>
          {` of ${voiceOptions.length} voices`}
        </span>
        <Tooltip content="clear filters" size="sm">
          <Button
            type="reset"
            onClick={onReset}
            size="sm"
            radius="full"
            variant="flat"
            color="danger"
            className="h-min py-1"
            endContent={<VscRefresh size={16} />}
          >
            reset
          </Button>
        </Tooltip>
      </div>
      <div className="flex flex-row justify-end space-x-2">
        <Select
          aria-label="select gender"
          placeholder="gender"
          selectionMode="multiple"
          selectedKeys={filters.selectedGender}
          onChange={handleSelectionChange('selectedGender')}
          size="sm"
          radius="sm"
          variant="flat"
          isMultiline
          className="max-w-[150px]"
          classNames={{}}
          renderValue={(items) => {
            return (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Chip
                    variant="light"
                    size="sm"
                    key={item.key}
                    classNames={{
                      closeButton: 'text-tiny',
                    }}
                    onClose={() =>
                      handleChipClose('selectedGender', item.key as string)
                    }
                  >
                    {item.textValue === 'male' ? (
                      <FaMale color="lightblue" />
                    ) : (
                      <FaFemale color="lightpink" />
                    )}
                  </Chip>
                ))}
              </div>
            );
          }}
        >
          <SelectItem key="male" value="male" textValue="male">
            <Tooltip content="male" placement="bottom-end" size="sm">
              <span>
                <FaMale size={16} color="lightblue" className="-ml-1" />
              </span>
            </Tooltip>
          </SelectItem>
          <SelectItem key="female" value="female" textValue="female">
            <Tooltip content="female" placement="bottom" size="sm">
              <span>
                <FaFemale size={16} color="lightpink" className="-ml-1" />
              </span>
            </Tooltip>
          </SelectItem>
        </Select>

        <Select
          aria-label="select age"
          placeholder="age"
          selectionMode="multiple"
          selectedKeys={filters.selectedAge}
          onChange={handleSelectionChange('selectedAge')}
          size="sm"
          radius="sm"
          variant="flat"
          isMultiline
          className="max-w-[150px]"
          renderValue={(items) => {
            return (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Chip
                    variant="light"
                    size="sm"
                    radius="full"
                    key={item.key}
                    classNames={{
                      closeButton: 'text-tiny',
                    }}
                    onClose={() =>
                      handleChipClose('selectedAge', item.key as string)
                    }
                  >
                    {item.key === 'young' ? (
                      <BiChild size={18} className=" text-green-200" />
                    ) : item.key === 'middle-aged' ? (
                      <MdOutlineDirectionsWalk
                        size={18}
                        className=" text-green-400"
                      />
                    ) : (
                      <MdOutlineElderly size={18} className="text-green-600" />
                    )}
                  </Chip>
                ))}
              </div>
            );
          }}
        >
          <SelectItem key="young" value="young" textValue="young">
            <Tooltip content="young" placement="bottom" size="sm">
              <span>
                <BiChild size={18} className=" text-green-200" />
              </span>
            </Tooltip>
          </SelectItem>
          <SelectItem
            key="middle-aged"
            value="middle-aged"
            textValue="middle-aged"
          >
            <Tooltip content="middle-aged" placement="bottom" size="sm">
              <span>
                <MdOutlineDirectionsWalk
                  size={18}
                  className=" text-green-400"
                />
              </span>
            </Tooltip>
          </SelectItem>
          <SelectItem key="old" value="old" textValue="old">
            <Tooltip content="old" placement="bottom" size="sm">
              <span>
                <MdOutlineElderly size={18} className="text-green-600" />
              </span>
            </Tooltip>
          </SelectItem>
        </Select>

        <Select
          aria-label="select accent"
          placeholder="accent"
          selectionMode="multiple"
          selectedKeys={filters.selectedAccent}
          onChange={handleSelectionChange('selectedAccent')}
          size="sm"
          radius="sm"
          variant="flat"
          isMultiline
          className="max-w-[200px]"
          renderValue={(items) => {
            return (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Chip
                    variant="light"
                    size="sm"
                    radius="full"
                    key={item.key}
                    classNames={{
                      closeButton: 'text-tiny',
                    }}
                    onClose={() =>
                      handleChipClose('selectedAccent', item.key as string)
                    }
                  >
                    {getAccentEmoji(item.textValue!)}
                  </Chip>
                ))}
              </div>
            );
          }}
        >
          {accent.map((a) => (
            <SelectItem key={a} value={a} textValue={a}>
              {capitalize(a)}
            </SelectItem>
          ))}
        </Select>
        <Select
          selectionMode="multiple"
          placeholder="use case"
          selectedKeys={filters.selectedUseCase}
          onChange={handleSelectionChange('selectedUseCase')}
          size="sm"
          radius="sm"
          variant="flat"
          isMultiline
          className="max-w-[175px]"
          renderValue={(items) => {
            return (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Chip
                    variant="light"
                    color="primary"
                    size="sm"
                    key={item.key}
                    classNames={{
                      closeButton: 'text-tiny',
                    }}
                    onClose={() =>
                      handleChipClose('selectedUseCase', item.key as string)
                    }
                  >
                    {item.textValue}
                  </Chip>
                ))}
              </div>
            );
          }}
        >
          {useCase.sort().map((useCase) => (
            <SelectItem key={useCase}>{useCase}</SelectItem>
          ))}
        </Select>

        <Select
          aria-label="select description"
          placeholder="description"
          selectionMode="multiple"
          selectedKeys={filters.selectedDescription}
          onChange={handleSelectionChange('selectedDescription')}
          size="sm"
          variant="flat"
          radius="sm"
          isMultiline
          className="max-w-[175px]"
          renderValue={(items) => {
            return (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Chip
                    variant="light"
                    color="secondary"
                    size="sm"
                    key={item.key}
                    classNames={{
                      closeButton: 'text-tiny',
                    }}
                    onClose={() =>
                      handleChipClose('selectedDescription', item.key as string)
                    }
                  >
                    {item.textValue}
                  </Chip>
                ))}
              </div>
            );
          }}
        >
          {description.sort().map((d) => (
            <SelectItem key={d} value={d}>
              {d}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
}
