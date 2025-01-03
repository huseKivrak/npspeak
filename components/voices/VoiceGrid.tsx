'use client';

import { useMemo, useState } from 'react';
import { Pagination, Select, SelectItem } from '@nextui-org/react';
import { VoiceOptionProps } from '@/types/elevenlabs';
import { VoiceCard } from '../cards/VoiceCard';

export function VoiceGrid({
  voices,
  onSelectVoice,
  selectedVoiceId,
}: {
  voices: VoiceOptionProps[];
  onSelectVoice: (voiceId: string) => void;
  selectedVoiceId?: string;
}) {
  const [ page, setPage ] = useState(1);
  const [ voicesPerPage, setVoicesPerPage ] = useState(12);
  const perPageOptions = [
    { label: '3', value: 3 },
    { label: '6', value: 6 },
    { label: '9', value: 9 },
    { label: '12', value: 12 },
  ];

  const pages = useMemo(() => {
    return Math.ceil(voices.length / voicesPerPage);
  }, [ voices, voicesPerPage ]);

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    setVoicesPerPage(value);
    setPage(1);
  };
  const items = useMemo(() => {
    const start = (page - 1) * voicesPerPage;
    const end = start + voicesPerPage;

    return voices.slice(start, end);
  }, [ page, voices, voicesPerPage ]);

  return (
    <div className="flex flex-col">
      <div className="grid auto-rows-max grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 xl:gap-6 items-center justify-items-stretch">
        {items.map((v) => (
          <VoiceCard
            voice={v}
            key={v.id}
            onSelect={() => onSelectVoice(v.id)}
            isSelected={v.id === selectedVoiceId}
          />
        ))}
      </div>
      <div className="flex items-center justify-end gap-8 mt-4">
        <Pagination
          showControls
          size="lg"
          variant="light"
          color="default"
          classNames={{
            wrapper: 'gap-2 overflow-visible h-8 md:h-12 font-alagard',
            item: 'w-6 h-6 text-small rounded-full',
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
          aria-label="rows per page"
          selectedKeys={[ voicesPerPage.toString() ]}
          onChange={handlePerPageChange}
          popoverProps={{
            placement: 'top-start',
            radius: 'none',
          }}
          classNames={{
            base: 'max-w-[75px] flex items-center justify-center text-center font-thin font-alagard text-secondary',
            trigger: 'min-h-8 px-2 text-secondary',
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
  );
}
