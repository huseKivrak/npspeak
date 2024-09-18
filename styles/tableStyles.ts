import { SlotsToClasses, TableSlots } from '@nextui-org/react';

export const tableStyles: SlotsToClasses<TableSlots> = {
  wrapper: 'p-0 w-full h-[200px] max-h-[382px]',
  th: [
    'bg-transparent',
    'font-mono',
    'tracking-wider',
    'border-b',
    'border-divider',
  ],
  td: [
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
