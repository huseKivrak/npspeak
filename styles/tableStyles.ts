import { SlotsToClasses, TableSlots } from '@nextui-org/react';

export const tableStyles: SlotsToClasses<TableSlots> = {
  wrapper: 'p-0 rounded-sm min-h-[382px] max-h-[382px] max-w-screen',
  th: ['bg-transparent', 'font-bold', 'border-b', 'border-divider'],
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
