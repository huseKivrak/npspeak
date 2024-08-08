'use client';

import { useMemo, useState } from 'react';
import { Pagination, Select, SelectItem } from '@nextui-org/react';
import { VoiceOptionProps } from '@/types/elevenlabs';
import { VoiceCard } from './cards/VoiceCard';
import { VoiceLabelFilter } from './forms/customSelect/VoiceLabelFilter';

export function VoiceGrid({
  voices,
  onSelectVoice,
}: {
  voices: VoiceOptionProps[];
  onSelectVoice: (voiceId: string) => void;
}) {
  const [filteredVoices, setFilteredVoices] =
    useState<VoiceOptionProps[]>(voices);
  const [page, setPage] = useState(1);
  const [voicesPerPage, setVoicesPerPage] = useState(12);
  const perPageOptions = [
    { label: '3', value: 3 },
    { label: '6', value: 6 },
    { label: '9', value: 9 },
    { label: '12', value: 12 },
  ];

  const pages = useMemo(() => {
    return Math.ceil(filteredVoices.length / voicesPerPage);
  }, [filteredVoices, voicesPerPage]);
  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setVoicesPerPage(value);
    setFilteredVoices(items);
  };
  const items = useMemo(() => {
    const start = (page - 1) * voicesPerPage;
    const end = start + voicesPerPage;

    return filteredVoices.slice(start, end);
  }, [page, filteredVoices]);
  return (
    <div className="flex gap-8">
      <VoiceLabelFilter
        voiceOptions={voices}
        onFilterChange={(v) => setFilteredVoices(v)}
      />
      <div className="flex flex-col">
        <div className="flex items-center ml-8 mb-2">
          <span className="text-tiny md:text-large font-alagard flex-1 ml-4">
            <span className="text-warning">{`${filteredVoices.length}`}</span>
            {` of ${voices.length} voices`}
          </span>

          <div className="flex items-center justify-end gap-8">
            <Pagination
              showControls
              size="lg"
              variant="bordered"
              classNames={{
                wrapper: 'gap-2 overflow-visible h-8 md:h-12 font-alagard',
                item: 'w-6 h-6 text-tiny rounded-full',
                cursor: 'w-6 h-6 text-tiny shadow-xl rounded-full',
              }}
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
            <Select
              size="sm"
              variant="bordered"
              color="warning"
              radius="none"
              label="rows"
              aria-label="rows per page"
              selectedKeys={voicesPerPage.toString()}
              onChange={handlePerPageChange}
              popoverProps={{
                placement: 'right-start',
                radius: 'none',
              }}
              classNames={{
                base: 'max-w-[75px] flex items-center justify-center text-center font-thin font-alagard text-warning',
                trigger: 'min-h-12 px-2 text-warning',
                label: 'text-sm',
              }}
            >
              {perPageOptions.map((option) => (
                <SelectItem key={option.value} className="font-alagard">
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="grid auto-rows-max grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 items-start justify-items-stretch">
          {items.map((v) => (
            <VoiceCard
              voice={v}
              key={v.value}
              onSelect={() => onSelectVoice(v.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
