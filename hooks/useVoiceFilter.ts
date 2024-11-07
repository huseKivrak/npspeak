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

/**
 * Custom hook for filtering voices based on selected options.
 *
 * @param voices - An array of available voices
 * @returns An object containing:
 * - allFilterOptions: An object mapping each filter key to an array of all unique options.
 * - selectedOptions: The currently selected options for each filter key.
 * - filteredVoices: An array of voices that match the selected options.
 * - updateFilter: Function to update the selected options for a given filter key.
 * - resetFilters: Function to reset all filters to their default (empty) state.
 */
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
    const filtered = voices.filter((voice) =>
      filterKeys.every(
        (key) =>
          selectedOptions[key].size === 0 ||
          selectedOptions[key].has(voice[key])
      )
    );

    //Sort by voices with summaries first, alphabetically otherwise
    return filtered.sort((a, b) => {
      const aHasSummary = a.summary ? 1 : 0;
      const bHasSummary = b.summary ? 1 : 0;
      if (aHasSummary !== bHasSummary) return bHasSummary - aHasSummary;
      return a.label.localeCompare(b.label);
    });
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
