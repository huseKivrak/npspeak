'use client';

import { useEffect } from 'react';
import { Button, Tooltip, Select, SelectItem, Chip } from '@nextui-org/react';
import { getAccentEmoji } from '@/utils/helpers/formHelpers';
import { capitalize } from '@/utils/helpers/formatHelpers';
import { FaMale, FaFemale } from 'react-icons/fa';
import { MdOutlineDirectionsWalk, MdOutlineElderly } from 'react-icons/md';
import { BiChild } from 'react-icons/bi';
import { VscRefresh } from 'react-icons/vsc';
import { VoiceOptionProps } from '@/types/elevenlabs';
import { FilterKey, useVoiceFilter } from '@/hooks/useVoiceFilter';

export function VoiceFilter({
  voices,
  onFilterChange,
}: {
  voices: VoiceOptionProps[];
  onFilterChange: (filteredVoices: VoiceOptionProps[]) => void;
}) {
  const {
    allFilterOptions,
    selectedOptions,
    filteredVoices,
    updateFilter,
    resetFilters,
  } = useVoiceFilter(voices);

  const { accent, useCase, description } = allFilterOptions;

  const handleSelectionChange =
    (filterType: FilterKey) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      updateFilter(filterType, new Set(e.target.value.split(',')));
    };

  const handleChipClose = (filterType: FilterKey, value: string) => {
    const newSet = new Set(selectedOptions[filterType]);
    newSet.delete(value);
    updateFilter(filterType, newSet);
  };

  useEffect(() => {
    onFilterChange(filteredVoices);
  }, [filteredVoices, onFilterChange]);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-8 justify-end">
        <Tooltip content="clear filters" size="sm">
          <Button
            type="button"
            onClick={resetFilters}
            size="sm"
            radius="full"
            variant="flat"
            color="danger"
            className="h-min py-1"
            endContent={<VscRefresh size={16} />}
          >
            reset filters
          </Button>
        </Tooltip>
      </div>
      <div className="flex items-start justify-between">
        <Select
          aria-label="select gender"
          placeholder="gender"
          selectionMode="multiple"
          selectedKeys={selectedOptions.gender}
          onChange={handleSelectionChange('gender')}
          size="sm"
          radius="sm"
          variant="flat"
          isMultiline
          className="w-1/3 pr-2"
          classNames={{
            value: 'flex items-center justify-center',
          }}
          popoverProps={{
            classNames: {
              base: 'max-w-fit',
            },
          }}
          renderValue={(items) => {
            return (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Chip
                    variant="light"
                    size="sm"
                    key={item.key}
                    classNames={{
                      closeButton: 'text-sm',
                    }}
                    onClose={() =>
                      handleChipClose('gender', item.key as string)
                    }
                  >
                    {item.textValue === 'male' ? (
                      <FaMale color="lightblue" size={20} />
                    ) : (
                      <FaFemale color="lightpink" size={20} />
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
                <FaMale size={20} color="lightblue" className="-ml-1" />
              </span>
            </Tooltip>
          </SelectItem>
          <SelectItem key="female" value="female" textValue="female">
            <Tooltip content="female" placement="bottom" size="sm">
              <span>
                <FaFemale size={20} color="lightpink" className="-ml-1" />
              </span>
            </Tooltip>
          </SelectItem>
        </Select>

        <Select
          aria-label="select age"
          placeholder="age"
          selectionMode="multiple"
          selectedKeys={selectedOptions.age}
          onChange={handleSelectionChange('age')}
          size="sm"
          radius="sm"
          variant="flat"
          isMultiline
          className="w-1/3 px-1"
          classNames={{
            value: 'flex items-center justify-center',
          }}
          popoverProps={{
            classNames: {
              base: 'max-w-fit',
            },
          }}
          renderValue={(items) => {
            return (
              <div className="flex flex-wrap">
                {items.map((item) => (
                  <Chip
                    variant="light"
                    size="sm"
                    radius="full"
                    key={item.key}
                    classNames={{
                      closeButton: 'text-sm',
                    }}
                    onClose={() => handleChipClose('age', item.key as string)}
                  >
                    {item.key === 'young' ? (
                      <BiChild size={20} className=" text-green-200" />
                    ) : item.key === 'middle-aged' ? (
                      <MdOutlineDirectionsWalk
                        size={20}
                        className=" text-green-400"
                      />
                    ) : (
                      <MdOutlineElderly size={20} className="text-green-600" />
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
                <BiChild size={20} className=" text-green-200" />
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
                  size={20}
                  className=" text-green-400"
                />
              </span>
            </Tooltip>
          </SelectItem>
          <SelectItem key="old" value="old" textValue="old">
            <Tooltip content="old" placement="bottom" size="sm">
              <span>
                <MdOutlineElderly size={20} className="text-green-600" />
              </span>
            </Tooltip>
          </SelectItem>
        </Select>

        <Select
          aria-label="select accent"
          placeholder="accent"
          selectionMode="multiple"
          selectedKeys={selectedOptions.accent}
          onChange={handleSelectionChange('accent')}
          size="sm"
          radius="sm"
          variant="flat"
          isMultiline
          className="w-1/3 pl-2"
          classNames={{
            value: 'flex items-center justify-center',
          }}
          popoverProps={{
            classNames: {
              base: 'max-w-fit',
            },
          }}
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
                      closeButton: 'text-sm',
                    }}
                    onClose={() =>
                      handleChipClose('accent', item.key as string)
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
      </div>
      <div className="flex items-start justify-between">
        <Select
          selectionMode="multiple"
          placeholder="use case"
          selectedKeys={selectedOptions.useCase}
          onChange={handleSelectionChange('useCase')}
          size="sm"
          radius="sm"
          variant="flat"
          isMultiline
          className="w-1/2 pr-1"
          classNames={{
            value: 'text-center',
            trigger: 'justify-center',
          }}
          popoverProps={{
            classNames: {
              base: 'max-w-fit',
            },
          }}
          renderValue={(items) => {
            return (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Chip
                    variant="light"
                    color="primary"
                    size="sm"
                    key={item.key}
                    className="text-sm tracking-tighter"
                    classNames={{
                      closeButton: 'text-sm',
                    }}
                    onClose={() =>
                      handleChipClose('useCase', item.key as string)
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
          selectedKeys={selectedOptions.description}
          onChange={handleSelectionChange('description')}
          size="sm"
          variant="flat"
          radius="sm"
          isMultiline
          className="w-1/2 pl-2"
          classNames={{
            value: 'text-center',
            trigger: 'justify-center',
          }}
          popoverProps={{
            classNames: {
              base: 'max-w-fit',
            },
          }}
          renderValue={(items) => {
            return (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Chip
                    variant="light"
                    color="secondary"
                    size="sm"
                    key={item.key}
                    className="text-sm tracking-tighter"
                    classNames={{
                      closeButton: 'text-sm',
                    }}
                    onClose={() =>
                      handleChipClose('description', item.key as string)
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
