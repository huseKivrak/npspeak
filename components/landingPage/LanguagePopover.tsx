
import { SupportedLanguages } from '@/lib/constants';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { FaCircleInfo } from 'react-icons/fa6';

export function LanguagePopover() {
  return (
    <Popover
      showArrow
      color='foreground' >
      <PopoverTrigger>
        <button aria-label="More info">
          <FaCircleInfo className='text-xs text-secondary mb-1 ml-1' />
        </button>
      </PopoverTrigger>
      <PopoverContent className='max-w-[300px]'>
        <p className='text-xs text-pretty'>
          <code>
            {SupportedLanguages}
          </code>
          .
        </p>
      </PopoverContent>
    </Popover>
  );
}