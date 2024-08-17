'use client';

import { VoiceOptionProps } from '@/types/elevenlabs';
import { useMemo, useState } from 'react';

export type FilterKey = 'gender' | 'age' | 'accent' | 'useCase' | 'description';

export type FilterOptions = {
  [K in FilterKey]: Set<string>;
};

export type AllFilterOptions = {
  [K in FilterKey]: string[];
};

export function useVoiceFilter(voices: VoiceOptionProps[]) {
  const [selectedOptions, setSelectedOptions] = useState<FilterOptions>({
    gender: new Set(),
    age: new Set(),
    accent: new Set(),
    useCase: new Set(),
    description: new Set(),
  });

  const filterKeys: FilterKey[] = [
    'gender',
    'age',
    'accent',
    'useCase',
    'description',
  ];

  const allFilterOptions = useMemo(() => {
    return filterKeys.reduce((acc, key) => {
      acc[key] = Array.from(new Set(voices.map((voice) => voice[key])));
      return acc;
    }, {} as AllFilterOptions);
  }, [voices]);

  const filteredVoices = useMemo(() => {
    return voices.filter((voice) =>
      filterKeys.every(
        (key) =>
          selectedOptions[key].size === 0 ||
          selectedOptions[key].has(voice[key])
      )
    );
  }, [voices, selectedOptions]);

  const updateFilter = (key: FilterKey, selectedKeys: Set<string>) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [key]: selectedKeys,
    }));
  };

  const resetFilters = () => {
    setSelectedOptions({
      gender: new Set(),
      age: new Set(),
      accent: new Set(),
      useCase: new Set(),
      description: new Set(),
    });
  };

  return {
    allFilterOptions,
    selectedOptions,
    filteredVoices,
    updateFilter,
    resetFilters,
  };
}
