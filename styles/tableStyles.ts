import { SlotsToClasses, TableSlots } from '@nextui-org/react';

export const tableStyles: SlotsToClasses<TableSlots> = {
  wrapper: 'p-0 w-full h-full max-h-[382px] pb-2',
  th: [
    'bg-transparent',
    'font-mono',
    'tracking-tight',
    'border-b',
    'border-divider',
    'text-sm md:text-xl',
    'font-normal',
  ],
  td: [
    'text-xl lg:text-2xl',
    // changing the rows border radius
    // first
    'group-data-[first=true]:first:before:rounded-none',
    'group-data-[first=true]:last:before:rounded-none',
    // middle
    'group-data-[middle=true]:before:rounded-none',
    // last
    'group-data-[last=true]:first:before:rounded-none',
    'group-data-[last=true]:last:before:rounded-none',
  ],
};
