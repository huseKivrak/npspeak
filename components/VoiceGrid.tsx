'use client';
import { useState } from 'react';
import { VoiceOptionProps } from '@/types/elevenlabs';
import { VoiceCard } from './cards/VoiceCard';
import { VoiceLabelFilter } from './forms/customSelect/VoiceLabelFilter';

export function VoiceGrid({ voices }: { voices: VoiceOptionProps[] }) {
  const [filteredVoices, setFilteredVoices] =
    useState<VoiceOptionProps[]>(voices);

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="">Find the perfect voice!</h1>
      <div className="h-full flex w-full justify-evenly gap-4">
        <VoiceLabelFilter
          voiceOptions={voices}
          onFilterChange={(v) => setFilteredVoices(v)}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start justify-items-stretch">
          {filteredVoices.map((v) => (
            <VoiceCard voice={v} key={v.value} />
          ))}
        </div>
      </div>
    </div>
  );
}
