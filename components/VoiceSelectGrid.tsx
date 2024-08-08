'use client';

import { useMemo, useState } from 'react';
import { VoiceOptionProps } from '@/types/elevenlabs';
import { VoiceCard } from './cards/VoiceCard';
import { VoiceLabelFilter } from './forms/customSelect/VoiceLabelFilter';
import { Pagination, Select, SelectItem } from '@nextui-org/react';

export function VoiceGrid({ voices }: { voices: VoiceOptionProps[] }) {
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
    <div className="flex flex-col gap-8">
      <h1 className="text-white text-center font-alagard">voice select</h1>

      <div className="h-full flex w-full justify-evenly gap-4">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-evenly">
            <h2 className="text-tiny md:text-large font-alagard flex-1 ml-4">
              <span className="text-warning">{`${filteredVoices.length}`}</span>
              <span className="text-white">{` of ${voices.length} voices`}</span>
            </h2>
            <div className="flex items-center justify-end gap-4">
              <Pagination
                size="lg"
                variant="bordered"
                showControls
                classNames={{
                  wrapper: 'gap-2 overflow-visible h-8 md:h-16 font-alagard',
                  item: 'w-8 h-8 md:w-10 md:h-10 text-tiny rounded-full',
                  cursor:
                    'w-8 h-8 md:w-10 md:h-10 text-tiny shadow-xl shadow-warning/10 border-warning rounded-full',
                }}
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
              <Select
                size="sm"
                variant="faded"
                color="warning"
                radius="none"
                aria-label="voices per page"
                selectedKeys={voicesPerPage.toString()}
                onChange={handlePerPageChange}
                popoverProps={{
                  placement: 'right-start',
                  radius: 'none',
                  size: 'lg',
                }}
                classNames={{
                  base: 'max-w-[75px] flex items-center justify-center text-center text-white font-thin font-alagard text-warning',
                  trigger: 'min-h-12 text-warning',
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
          <div className="flex justify-between gap-4">
            <VoiceLabelFilter
              voiceOptions={voices}
              onFilterChange={(v) => setFilteredVoices(v)}
            />
            <div className="grid auto-rows-max grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 items-start justify-items-stretch">
              {items.map((v) => (
                <VoiceCard voice={v} key={v.value} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
